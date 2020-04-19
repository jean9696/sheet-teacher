import { uniq } from 'lodash'
import * as React from 'react'

import { Text } from '@habx/ui-core'

import { translateNote } from '@lib/notes'
import { playNote } from '@lib/sound'
import { Notes } from '@lib/types'

import { Key, KeysContainerPiano, PianoContainer } from './Piano.style'

const NOTES: string[] = uniq(Object.values(Notes))
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
const mapKeys = (notes: string[]) => {
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
  const [activeNote, setActiveNote] = React.useState<string>(null)
  const mappedKeys = React.useMemo(() => mapKeys(NOTES), [])

  const handleNotePlayed = React.useCallback(
    (note: string) => {
      setActiveNote(note)
      onKeyPressed(note)
    },
    [onKeyPressed]
  )

  const handleKeyPressed = React.useCallback(
    (note: string, octave: number = 4) => {
      if (!Notes[note]) {
        return
      }
      playNote(note, octave)
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
    <PianoContainer backgroundColor="#fff">
      <KeysContainerPiano>
        {NOTES.map((note) => (
          <Key
            key={note}
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
      </KeysContainerPiano>
    </PianoContainer>
  )
}

interface PianoInterface {
  onKeyPressed: (note: string) => void
}

export default Piano
