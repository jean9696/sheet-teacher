import { take } from 'lodash'

import { Notes, Tones } from '@lib/types'

const sharps = [
  Notes['F#'],
  Notes['C#'],
  Notes['G#'],
  Notes['D#'],
  Notes['A#'],
  Notes['E#'],
  Notes['B#'],
]
const flats = [
  Notes['Bb'],
  Notes['Eb'],
  Notes['Ab'],
  Notes['Db'],
  Notes['Gb'],
  Notes['Cb'],
  Notes['Fb'],
]

export const getToneNotes = (tone: Tones) => {
  if (tone.includes('#')) {
    const sharpCount = Number(tone?.replace('#', ''))
    const currentSharps = take(sharps, sharpCount)
    return Object.keys(Notes).filter(
      (note) =>
        !note.includes('b') &&
        (currentSharps.includes(note) ||
          (!note.includes('#') &&
            !currentSharps.find((sharp) => sharp?.replace('#', '') === note)))
    )
  }
  if (tone.includes('b')) {
    const flatCount = Number(tone?.replace('b', ''))
    const currentFlat = take(flats, flatCount)
    return Object.keys(Notes).filter(
      (note) =>
        !note.includes('#') &&
        (currentFlat.includes(note) ||
          (!note.includes('b') &&
            !currentFlat.find((flat) => flat?.replace('b', '') === note)))
    )
  }
  return Object.keys(Notes).filter(
    (note) => !note.includes('b') && !note.includes('#')
  )
}
