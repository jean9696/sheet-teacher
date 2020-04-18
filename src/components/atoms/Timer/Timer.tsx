import * as React from 'react'

import { Button } from '@habx/ui-core'

import { smallBreakpointValue } from '@lib/breakpoints'

let Timer: React.FunctionComponent<TimerInterface>
Timer = ({ time, onStart, onEnd }) => {
  const [startTime, setStartTime] = React.useState<number>()
  const [currentTime, setCurrentTime] = React.useState<number>(0)
  React.useEffect(() => {
    if (startTime) {
      const interval = setInterval(
        () =>
          setCurrentTime(Math.floor((new Date().getTime() - startTime) / 1000)),
        200
      )
      return () => clearInterval(interval)
    }
  }, [startTime])
  const diffTime = time - currentTime
  React.useEffect(() => {
    if (diffTime < 1) {
      setStartTime(null)
      setCurrentTime(0)
      onEnd()
    }
  }, [diffTime, onEnd])
  return (
    <Button
      small={window.innerHeight < smallBreakpointValue}
      outline
      disabled={!!startTime}
      onClick={() => {
        onStart()
        return setStartTime(new Date().getTime())
      }}
    >
      {startTime ? `${diffTime}s` : 'Start !'}
    </Button>
  )
}

interface TimerInterface {
  onStart: () => void
  onEnd: () => void
  time: number
}

export default Timer
