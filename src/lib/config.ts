import { Tones } from '@lib/types'

export type GenerateNoteConfig = {
  octaves: number[]
  withFlat: boolean
  withSharp: boolean
  clef: StaveClef
  tone?: Tones
}

export enum StaveClef {
  treble = 'treble',
  bass = 'bass',
}
export type StaveConfig = {
  addAccidental: boolean
  clef: StaveClef
  tone?: Tones
}
