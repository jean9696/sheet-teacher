import * as React from 'react'
import Vex from 'vexflow'

import { useTheme } from '@habx/ui-core'

import { Notes } from '@lib/notes'
const VF = Vex.Flow

const WIDTH = 500
const HEIGHT = 200

const useStave = () => {
  const staveRef = React.useRef()

  const [loading, setLoading] = React.useState<boolean>(true)
  const vexStave = React.useMemo(() => {
    if (!loading) {
      const renderer = new VF.Renderer(
        staveRef.current,
        // @ts-ignore
        VF.Renderer.Backends.SVG
      )

      renderer.resize(WIDTH, HEIGHT)
      const context = renderer.getContext()

      const stave = new VF.Stave(10, 40, WIDTH * 0.8)

      stave.addClef('treble')

      stave.setContext(context).draw()
      return {
        stave,
        context,
        loading,
      }
    }
    return { loading }
  }, [loading])
  if (loading) {
    setTimeout(() => setLoading(!staveRef.current), 200)
  }
  return { ...vexStave, staveRef }
}

const Stave: React.FunctionComponent<StaveInterface> = ({
  notes: rawNotes,
  currentNoteIndex,
}) => {
  const theme = useTheme()

  const vexStave = useStave()

  React.useEffect(() => {
    if (!vexStave.loading) {
      // @ts-ignore
      const group = vexStave.context.openGroup()
      const notes = rawNotes.map((note, index) => {
        const noteArray = note.split('')
        noteArray.splice(noteArray.length - 1, 0, '/')
        const vexNote = noteArray.join('')
        const staveNote = new Vex.Flow.StaveNote({
          clef: 'treble',
          keys: [vexNote],
          duration: 'q',
        })
        if (note.includes('#')) {
          staveNote.addAccidental(0, new VF.Accidental('#'))
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
  notes: Notes[]
  currentNoteIndex: number
}

export default Stave
