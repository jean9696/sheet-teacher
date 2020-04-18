import * as React from 'react'
import Vex from 'vexflow'

import { useTheme } from '@habx/ui-core'

import { StaveClef, StaveConfig } from '@lib/config'
import { Tones } from '@lib/types'

const VF = Vex.Flow

const WIDTH = 500
const HEIGHT = 150

const useStave = (config: StaveConfig) => {
  const staveRef = React.useRef<HTMLDivElement>(null)

  const [loading, setLoading] = React.useState<boolean>(true)
  const vexStave = React.useMemo(() => {
    if (!loading) {
      staveRef.current.innerHTML = ''
      const renderer = new VF.Renderer(
        staveRef.current,
        // @ts-ignore
        VF.Renderer.Backends.SVG
      )

      renderer.resize(WIDTH, HEIGHT)
      const context = renderer.getContext()

      const stave = new VF.Stave(0, HEIGHT / 10, WIDTH)
      stave.setContext(context)
      stave.addClef(config.clef)
      if (config.tone) {
        const vexTone = Object.keys(Tones)
          .find((toneKey) => Tones[toneKey] === config.tone)
          .split('_')[0]
        stave.addKeySignature(vexTone)
      }
      stave.draw()
      return {
        stave,
        context,
        loading,
      }
    }
    return { loading }
  }, [config.clef, config.tone, loading])

  if (loading) {
    setTimeout(() => setLoading(!staveRef.current), 10)
  }
  return { ...vexStave, staveRef }
}

const DEFAULT_CONFIG: StaveConfig = {
  addAccidental: true,
  clef: StaveClef.treble,
}

const Stave: React.FunctionComponent<StaveInterface> = ({
  notes: rawNotes,
  currentNoteIndex,
  config = DEFAULT_CONFIG,
}) => {
  const theme = useTheme()

  const vexStave = useStave(config)

  React.useEffect(() => {
    if (!vexStave.loading) {
      // @ts-ignore
      const group = vexStave.context.openGroup()
      const notes = rawNotes.map((note, index) => {
        const vexNote = [...note.split('')].splice(0, 2).join('/')
        const staveNote = new Vex.Flow.StaveNote({
          clef: config.clef,
          keys: [vexNote],
          duration: 'q',
        })
        if (config.addAccidental) {
          if (note.includes('b')) {
            staveNote.addAccidental(0, new VF.Accidental('b'))
          }
          if (note.includes('#')) {
            staveNote.addAccidental(0, new VF.Accidental('#'))
          }
        }
        if (index === currentNoteIndex) {
          staveNote.setStyle({ fillStyle: theme.colors.primary.base })
        }
        return staveNote
      })
      const voice = new Vex.Flow.Voice({ num_beats: 4, beat_value: 4 })
      voice.addTickables(notes)
      new VF.Formatter().joinVoices([voice]).format([voice], WIDTH * 0.8)
      voice.draw(vexStave.context, vexStave.stave)
      // @ts-ignore
      vexStave.context.closeGroup()
      // @ts-ignore
      return () => vexStave.context.svg.removeChild(group)
    }
  }, [
    config.addAccidental,
    config.clef,
    currentNoteIndex,
    rawNotes,
    theme.colors.primary.base,
    vexStave.context,
    vexStave.loading,
    vexStave.stave,
  ])
  return <div ref={vexStave.staveRef} />
}

interface StaveInterface {
  notes: string[]
  currentNoteIndex: number
  config?: StaveConfig
}

export default Stave
