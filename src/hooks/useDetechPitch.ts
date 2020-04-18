// https://github.com/cwilso/PitchDetect/blob/master/index.html
import * as React from 'react'
// @ts-ignore
window.AudioContext = window.AudioContext || window.webkitAudioContext

// TODO: cleanup this mess
class PitchDetector {
  audioContext: AudioContext = null
  isPlaying: boolean
  analyser: AnalyserNode
  mediaStreamSource = null
  MAX_SIZE
  processIds = []
  buflen = 1024
  buf = new Float32Array(this.buflen)

  noteStrings = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]

  constructor(config: {
    onError?: (error: any) => void
    onSound?: (frenquecy: number) => void
  }) {
    this.audioContext = new AudioContext()
    this.MAX_SIZE = Math.max(4, Math.floor(this.audioContext.sampleRate / 5000)) // corresponds to a 5kHz signal
    if (config.onError) {
      this.onError = config.onError
    }
    if (config.onSound) {
      this.onSound = config.onSound
    }
    this.isPlaying = false
  }

  onSound: (sound: any) => void = () => {}
  onError: (error: any) => void = console.error // eslint-disable-line

  getUserMedia(dictionary, callback) {
    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        // @ts-ignore
        navigator.webkitGetUserMedia ||
        // @ts-ignore
        navigator.mozGetUserMedia
      navigator.getUserMedia(dictionary, callback, this.onError)
    } catch (e) {
      this.onError(e)
    }
  }

  volumeAudioProcess = (processor) => (event) => {
    const buf = event.inputBuffer.getChannelData(0)
    const bufLength = buf.length
    let sum = 0
    let x

    // Do a root-mean-square on the samples: sum up the squares...
    for (let i = 0; i < bufLength; i++) {
      x = buf[i]
      if (Math.abs(x) >= processor.clipLevel) {
        processor.clipping = true
        processor.lastClip = window.performance.now()
      }
      sum += x * x
    }

    // ... then take the square root of the sum.
    const rms = Math.sqrt(sum / bufLength)

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    processor.volume = Math.max(rms, processor.volume * processor.averaging)
  }
  createAudioMeter = (audioContext) => {
    const processor = audioContext.createScriptProcessor(512)
    processor.onaudioprocess = this.volumeAudioProcess(processor)
    processor.clipping = false
    processor.lastClip = 0
    processor.volume = 0
    processor.clipLevel = 0.98
    processor.averaging = 0.95
    processor.clipLag = 750

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    processor.connect(audioContext.destination)

    processor.checkClipping = function () {
      if (!this.clipping) return false
      if (this.lastClip + this.clipLag < window.performance.now())
        this.clipping = false
      return this.clipping
    }

    processor.shutdown = function () {
      this.disconnect()
      this.onaudioprocess = null
    }

    return processor
  }

  meter
  gotStream = (processId, callback) => (stream) => {
    // Create an AudioNode from the stream.
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream)

    this.meter = this.createAudioMeter(this.audioContext)
    this.mediaStreamSource.connect(this.meter)

    // Connect it to the destination.
    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 2048
    this.mediaStreamSource.connect(this.analyser)
    this.updatePitch(processId, callback)
  }

  public addNoteListener = (callback) => {
    this.stopProcesses()
    const processId = new Date().toISOString()
    this.processIds.push(processId)
    this.getUserMedia(
      {
        audio: {
          mandatory: {
            googEchoCancellation: 'false',
            googAutoGainControl: 'false',
            googNoiseSuppression: 'false',
            googHighpassFilter: 'false',
          },
          optional: [],
        },
      },
      this.gotStream(processId, callback)
    )
  }

  noteFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
    return Math.round(noteNum) + 69
  }

  frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12)
  }

  centsOffFromPitch(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / this.frequencyFromNoteNumber(note))) /
        Math.log(2)
    )
  }

  MIN_SAMPLES = 0 // will be initialized when AudioContext is created.
  GOOD_ENOUGH_CORRELATION = 0.9 // this is the "bar" for how close a correlation needs to be

  autoCorrelate(buf2, sampleRate) {
    const SIZE = buf2.length
    const MAX_SAMPLES = Math.floor(SIZE / 2)
    let best_offset = -1
    let best_correlation = 0
    let rms = 0
    let foundGoodCorrelation = false
    let correlations = new Array(MAX_SAMPLES)

    for (let i = 0; i < SIZE; i++) {
      const val = buf2[i]
      rms += val * val
    }
    rms = Math.sqrt(rms / SIZE)
    if (rms < 0.01)
      // not enough signal
      return -1

    let lastCorrelation = 1
    for (let offset = this.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
      let correlation = 0

      for (let j = 0; j < MAX_SAMPLES; j++) {
        correlation += Math.abs(buf2[j] - buf2[j + offset])
      }
      correlation = 1 - correlation / MAX_SAMPLES
      correlations[offset] = correlation // store it, for the tweaking we need to do below.
      if (
        correlation > this.GOOD_ENOUGH_CORRELATION &&
        correlation > lastCorrelation
      ) {
        foundGoodCorrelation = true
        if (correlation > best_correlation) {
          best_correlation = correlation
          best_offset = offset
        }
      } else if (foundGoodCorrelation) {
        // short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
        // Now we need to tweak the offset - by interpolating between the values to the left and right of the
        // best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
        // we need to do a curve fit on correlations[] around best_offset in order to better determine precise
        // (anti-aliased) offset.

        // we know best_offset >=1,
        // since foundGoodCorrelation cannot go to true until the second pass (offset=1), and
        // we can't drop into this clause until the following pass (else if).
        const shift =
          (correlations[best_offset + 1] - correlations[best_offset - 1]) /
          correlations[best_offset]
        return sampleRate / (best_offset + 8 * shift)
      }
      lastCorrelation = correlation
    }
    if (best_correlation > 0.01) {
      // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
      return sampleRate / best_offset
    }
    return -1
    //	const best_frequency = sampleRate/best_offset;
  }

  lastNote
  sameNoteRepetitions = 0
  updatePitch(processId, callback) {
    if (this.meter.volume > 0.05) {
      //console.log(this.meter)
      this.onSound({ volume: this.meter.volume })
    }
    this.analyser.getFloatTimeDomainData(this.buf)
    const ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate)

    if (ac !== -1) {
      const pitch = ac
      const note = this.noteFromPitch(pitch)
      const detune = this.centsOffFromPitch(pitch, note)
      if (0 !== detune) {
        const noteString = this.noteStrings[note % 12]
        if (this.lastNote === noteString) {
          this.sameNoteRepetitions += 1
          if (this.sameNoteRepetitions > 5) {
            callback(noteString)
          }
        } else {
          this.sameNoteRepetitions = 0
        }
        this.lastNote = noteString
      }
    }
    if (this.processIds.includes(processId)) {
      setTimeout(() => this.updatePitch(processId, callback), 10)
    }
  }

  public stopProcesses = () => (this.processIds = [])

  public destroy = () => {
    this.processIds = []
    this.audioContext.close()
  }
}

const useDetectPitch = (callback: (note: string) => void) => {
  const [sound, setSound] = React.useState<any>({})
  const PitchDetectorRef = React.useRef(
    new PitchDetector({
      onSound: setSound,
    })
  )
  React.useEffect(() => {
    PitchDetectorRef.current.addNoteListener(callback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => PitchDetectorRef.current.destroy()
  }, [callback])
  return sound
}

export default useDetectPitch
