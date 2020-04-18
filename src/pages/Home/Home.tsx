import * as React from 'react'

import {
  ActionBar,
  Button,
  IconButton,
  Modal,
  palette,
  Tab,
  Title,
  Tooltip,
} from '@habx/ui-core'

import { MicPlay, Piano, Timer } from '@components/atoms'
import { Stave } from '@components/molecules'

import { GenerateNoteConfig, StaveClef } from '@lib/config'
import { generateNotes, isSameNote } from '@lib/notes'
import { Modes, Notes } from '@lib/types'

import ConfigForm from './ConfigForm/ConfigForm'
import reducer, { ActionTypes } from './Home.reducer'
import {
  GameContent,
  HomeContainer,
  HomeContent,
  HomeHeaderBar,
  ModesContainer,
  SmallConfigConfigContainer,
  StaveContainer,
  TimerContainer,
} from './Home.style'
import useScore from './Score/useScore'

const DEFAULT_CONFIG: GenerateNoteConfig = {
  octaves: [4],
  withFlat: false,
  withSharp: false,
  clef: StaveClef.treble,
}

let Home: React.FunctionComponent<TemplateInterface>
Home = () => {
  const storedConfig = window.localStorage.getItem('config')
  const defaultState = storedConfig
    ? JSON.parse(storedConfig)
    : {
        config: DEFAULT_CONFIG,
        currentNoteIndex: 0,
        notes: generateNotes(4, DEFAULT_CONFIG),
        mode: Modes.piano,
      }
  const [state, dispatch] = React.useReducer(reducer, defaultState)
  window.localStorage.setItem('config', JSON.stringify(state))
  const { config, currentNoteIndex, notes, mode } = state
  React.useEffect(() => {
    if (currentNoteIndex === notes.length) {
      dispatch({ value: generateNotes(4, config), type: ActionTypes.setNotes })
    }
  }, [config, currentNoteIndex, notes.length])

  const time = 30
  const { fail, success, start, end, isRunning } = useScore(time)

  React.useEffect(() => {
    dispatch({ value: generateNotes(4, config), type: ActionTypes.setNotes })
  }, [config, isRunning])

  const handleNote = React.useCallback(
    (note: Notes) => {
      if (isSameNote(note, notes?.[currentNoteIndex])) {
        dispatch({ type: ActionTypes.foundNote })
        success()
      } else {
        fail()
      }
    },
    [currentNoteIndex, fail, notes, success]
  )

  const staveConfig = {
    clef: config.clef,
    addAccidental: !config.tone,
    tone: config.tone,
  }
  const configModal = (
    <Modal
      persistent
      triggerElement={
        <Tooltip title="Configurer">
          <IconButton small icon="settings" disabled={isRunning} />
        </Tooltip>
      }
      title="Config"
    >
      {(modal) => (
        <React.Fragment>
          <ModesContainer>
            <Tab
              onClick={() =>
                dispatch({ type: ActionTypes.setMode, value: Modes.piano })
              }
              active={mode === Modes.piano}
            >
              Piano
            </Tab>
            <Tab
              active={mode === Modes.mic}
              onClick={() =>
                dispatch({ type: ActionTypes.setMode, value: Modes.mic })
              }
            >
              Micro
            </Tab>
          </ModesContainer>
          <br />
          <ConfigForm
            disabled={isRunning}
            value={config}
            onChange={(value) =>
              dispatch({ type: ActionTypes.setConfig, value })
            }
          />
          <ActionBar>
            <Button fullWidth onClick={modal.close}>
              Valider
            </Button>
          </ActionBar>
        </React.Fragment>
      )}
    </Modal>
  )
  return (
    <HomeContainer backgroundColor={palette.darkBlue[800]}>
      <HomeHeaderBar backgroundColor={palette.darkBlue[800]}>
        <Title type="regular">Sheet teacher</Title>
        {configModal}
      </HomeHeaderBar>
      <HomeContent>
        <GameContent>
          <StaveContainer spacing="narrow-horizontal-only">
            <Stave
              currentNoteIndex={currentNoteIndex}
              notes={notes}
              config={staveConfig}
            />
          </StaveContainer>
          {mode === Modes.piano && <Piano onKeyPressed={handleNote} />}
          {mode === Modes.mic && <MicPlay onNotePlayed={handleNote} />}
          <br />
          <TimerContainer>
            <Timer time={time} onStart={start} onEnd={end} />
          </TimerContainer>
        </GameContent>
      </HomeContent>
      <SmallConfigConfigContainer>{configModal}</SmallConfigConfigContainer>
    </HomeContainer>
  )
}

interface TemplateInterface {}

export default Home
