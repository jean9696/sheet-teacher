import * as Tone from 'tone'

import { Notes } from '@lib/notes'

const synth = new Tone.Synth().toMaster()

export const setupSounds = () => Tone.start()
export const playNote = (note: Notes) => {
  synth.triggerAttackRelease(note, '8n')
}
