import * as React from 'react'

import { Text } from '@habx/ui-core'

import { Notes, translateNote } from '@lib/notes'
import { playNote, setupSounds } from '@lib/sound'

import { Key, PianoContainer } from './Piano.style'

const NOTES: Notes[] = Object.values(Notes)
const KEYS = [
  'q',
  'z',
  's',
  'e',
  'd',
  'r',
  'f',
  't',
  'g',
  'y',
  'h',
  'u',
  'j',
  'i',
  'k',
  'o',
  'l',
  'p',
  'm',
]
const mapKeys = (notes) => {
  let index = 0
  const keys = {}
  for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
    keys[KEYS[index]] = notes[noteIndex]
    if (
      !notes[noteIndex]?.includes('#') &&
      !notes[noteIndex + 1]?.includes('#')
    ) {
      index += 2
    } else {
      index += 1
    }
  }
  return keys
}
const Piano: React.FunctionComponent<PianoInterface> = ({ onKeyPressed }) => {
  const [activeNote, setActiveNote] = React.useState<Notes>(null)
  const mappedKeys = React.useMemo(() => mapKeys(NOTES), [])

  React.useLayoutEffect(() => {
    setupSounds()
  }, [])

  const handleNotePlayed = React.useCallback(
    (note: Notes) => {
      setActiveNote(note)
      onKeyPressed(note)
    },
    [onKeyPressed]
  )

  const handleKeyPressed = React.useCallback(
    (note: Notes) => {
      playNote(note)
      handleNotePlayed(note)
    },
    [handleNotePlayed]
  )

  React.useEffect(() => {
    const logKey = (e: KeyboardEvent) => {
      handleKeyPressed(mappedKeys[e.key])
    }
    const unlogKey = () => setActiveNote(null)

    window.addEventListener('keydown', logKey)
    window.addEventListener('keyup', unlogKey)
    return () => {
      window.removeEventListener('keydown', logKey)
      window.removeEventListener('keyup', unlogKey)
    }
  }, [activeNote, handleKeyPressed, handleNotePlayed, mappedKeys, onKeyPressed])

  return (
    <PianoContainer>
      {NOTES.map((note) => (
        <Key
          data-black={note.includes('#')}
          data-active={note === activeNote}
          onMouseDown={() => handleKeyPressed(note)}
          onMouseUp={() => setActiveNote(null)}
        >
          {!note.includes('#') && (
            <Text type="caption">{translateNote(note)}</Text>
          )}
        </Key>
      ))}
    </PianoContainer>
  )
}

interface PianoInterface {
  onKeyPressed: (note: Notes) => void
}

export default Piano
