import * as React from 'react'
import { CSSProperties } from 'styled-components'

import useDetectPitch from '@hooks/useDetectPitch'
import { translateNote } from '@lib/notes'
import { Notes } from '@lib/types'

import { MicPlayContainer } from './MicPlay.style'

const NOTES: Notes[] = Object.values(Notes)

const MicPlay: React.FunctionComponent<MicPlayInterface> = ({
  onNotePlayed,
}) => {
  const [lastNote, setLastNote] = React.useState<string>()
  const onDetectNote = React.useCallback(
    (soundNote) => {
      setLastNote(soundNote)
      const noteFound = NOTES.find((note) => note.includes(soundNote))
      onNotePlayed(noteFound)
    },
    [onNotePlayed]
  )
  const { volume } = useDetectPitch(onDetectNote)
  return (
    <MicPlayContainer
      style={{ '--scaleRatio': (volume * 20 * 30) / 100 + 1 } as CSSProperties}
    >
      {' '}
      {translateNote(lastNote)}
    </MicPlayContainer>
  )
}

interface MicPlayInterface {
  onNotePlayed: (note: Notes) => void
}

export default MicPlay
