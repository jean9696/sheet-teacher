import * as React from 'react'

import { Tab } from '@habx/ui-core'

import { Piano, MicPlay } from '@components/atoms'

import { Notes } from '@lib/notes'
import Stave from '@pages/Home/Stave'

import { GameContent, HomeContainer, ModesContainer } from './Home.style'

enum Modes {
  piano = 1,
  mic = 2,
}

const generateNote = (): Notes => {
  const notes = Object.values(Notes)
  const randomIndex = Math.floor(Math.random() * Math.floor(notes.length - 1))
  return notes[randomIndex]
}

const generateNotes = (length: number) =>
  new Array(length).fill(0).map(generateNote)

const Home: React.FunctionComponent<TemplateInterface> = () => {
  const [mode, setMode] = React.useState<Modes>(Modes.piano)
  const [currentNoteIndex, setCurrentNoteIndex] = React.useState<number>(0)
  const [notes, setRawNotes] = React.useState<Notes[]>(generateNotes(4))

  React.useLayoutEffect(() => {
    if (currentNoteIndex === notes.length) {
      setRawNotes(generateNotes(4))
      setCurrentNoteIndex(0)
    }
  }, [currentNoteIndex, notes.length])

  const handleNote = React.useCallback(
    (note: Notes) => {
      if (note === notes?.[currentNoteIndex]) {
        setCurrentNoteIndex(currentNoteIndex + 1)
      }
    },
    [currentNoteIndex, notes]
  )

  return (
    <HomeContainer>
      <ModesContainer>
        <Tab onClick={() => setMode(Modes.piano)} active={mode === Modes.piano}>
          Piano
        </Tab>
        <Tab onClick={() => setMode(Modes.mic)} active={mode === Modes.mic}>
          Mic
        </Tab>
      </ModesContainer>
      <GameContent>
        <Stave currentNoteIndex={currentNoteIndex} notes={notes} />
        {mode === Modes.piano && <Piano onKeyPressed={handleNote} />}
        {mode === Modes.mic && <MicPlay onNotePlayed={handleNote} />}
      </GameContent>
    </HomeContainer>
  )
}

interface TemplateInterface {}

export default Home
