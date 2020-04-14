export enum Notes {
  'C4' = 'C4',
  'C#4' = 'C#4',
  'D4' = 'D4',
  'D#4' = 'D#4',
  'E4' = 'E4',
  'F4' = 'F4',
  'F#4' = 'F#4',
  'G4' = 'G4',
  'G#4' = 'G#4',
  'A4' = 'A4',
  'A#4' = 'A#4',
  'B4' = 'B4',
  'C5' = 'C5',
}

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
