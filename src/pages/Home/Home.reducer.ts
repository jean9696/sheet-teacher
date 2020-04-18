import { GenerateNoteConfig } from '@lib/config'
import { Modes } from '@lib/types'

export type State = {
  config: GenerateNoteConfig
  mode: Modes
  currentNoteIndex: number
  notes: string[]
}

export enum ActionTypes {
  setConfig = 0,
  setMode = 1,
  foundNote = 2,
  setNotes = 3,
}

export type Action =
  | {
      type: ActionTypes.setConfig
      value: GenerateNoteConfig
    }
  | {
      type: ActionTypes.foundNote
    }
  | {
      type: ActionTypes.setMode
      value: Modes
    }
  | {
      type: ActionTypes.setNotes
      value: string[]
    }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.setConfig:
      return {
        ...state,
        config: action.value,
      }
    case ActionTypes.foundNote:
      return {
        ...state,
        currentNoteIndex: state.currentNoteIndex + 1,
      }
    case ActionTypes.setMode:
      return {
        ...state,
        mode: action.value,
      }
    case ActionTypes.setNotes:
      return {
        ...state,
        currentNoteIndex: 0,
        notes: action.value,
      }
  }
}

export default reducer
