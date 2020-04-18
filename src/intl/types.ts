export type messageIds =
  | 'treble'
  | 'bass'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'major'
  | 'minor'

export type messagesType = Record<messageIds, string>
