import * as React from 'react'
import { CSSProperties } from 'styled-components'

import { MicPlayContainer } from '@components/atoms/MicPlay/MicPlay.style'

import useDetectPitch from '@hooks/useDetechPitch'
import { Notes, translateNote } from '@lib/notes'

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
