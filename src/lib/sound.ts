import * as Tone from 'tone'

import { Notes } from '@lib/types'

const synth = new Tone.Synth().toMaster()
Tone.start()

export const playNote = (note: string, octave: number) => {
  if (!Notes[note]) {
    throw new Error(`Bad note ${note}`)
  }
  synth.triggerAttackRelease(`${note}${octave}`, '8n')
}
