import { GenerateNoteConfig } from '@lib/config'
import { getToneNotes } from '@lib/tones'
import { Notes } from '@lib/types'

export const translateNote = (note: string) => {
  if (!note) {
    return note
  }
  const [letter, ...rest] = note.split('')
  switch (letter) {
    case 'A':
      return ['La', ...rest].join('')
    case 'B':
      return ['Si', ...rest].join('')
    case 'C':
      return ['Do', ...rest].join('')
    case 'D':
      return ['Ré', ...rest].join('')
    case 'E':
      return ['Mi', ...rest].join('')
    case 'F':
      return ['Fa', ...rest].join('')
    case 'G':
      return ['Sol', ...rest].join('')
  }
}

export const removeOctave = (note: string) =>
  note
    ?.split('')
    .filter((c) => !Number(c))
    .join('')

export const isSameNote = (a: string, b: string) =>
  Notes[removeOctave(a)] === Notes[removeOctave(b)]

export const generateNote = (config: GenerateNoteConfig) => {
  const notes = config.tone
    ? getToneNotes(config.tone).flatMap((note) =>
        config.octaves.map((octave) => `${note}${octave}`)
      )
    : Object.keys(Notes).filter((note) => {
        if (!config.withFlat && note.includes('b')) {
          return false
        }
        if (!config.withSharp && note.includes('#')) {
          return false
        }
        return true
      })
  const randomNoteIndex = Math.floor(Math.random() * Math.floor(notes.length))
  const [note, octave] = notes[randomNoteIndex].split('')

  const randomOctaveIndex = Math.floor(
    Math.random() * Math.floor(config.octaves.length)
  )
  return `${note}${config.octaves[randomOctaveIndex]}${octave ?? ''}`
}

export const generateNotes = (length: number, config: GenerateNoteConfig) =>
  new Array(length).fill(0).map(() => generateNote(config))
