import * as React from 'react'

import { ActionBar, Button, Icon, prompt, Text } from '@habx/ui-core'

import { ScoresContainer, StarsContainer } from '@pages/Home/Score/Score.style'

const INITIAL_SCORE = { success: 0, fail: 0 }

const useScore = (time: number) => {
  const [started, setStarted] = React.useState<boolean>(false)
  const scoreRef = React.useRef<typeof INITIAL_SCORE>({ ...INITIAL_SCORE })
  const ratio = scoreRef.current.success - scoreRef.current.fail * 0.5
  const stars = ratio < 2 ? 0 : Math.floor((ratio / time) * 3)
  return {
    isRunning: started,
    success: () => (scoreRef.current.success += 1),
    fail: () => (scoreRef.current.fail += 1),
    score: scoreRef.current,
    stars,
    start: () => {
      scoreRef.current = { ...INITIAL_SCORE }
      setStarted(true)
    },
    end: () => {
      prompt(({ onResolve }) => ({
        persistent: true,
        title: 'Score',
        children: (
          <div>
            <StarsContainer>
              {[1, 2, 3].map((value) => (
                <Icon icon={value <= stars ? 'star' : 'star-outline'} />
              ))}
            </StarsContainer>
            <ScoresContainer>
              <Text>{scoreRef.current.success} notes jouées</Text>
              <Text warning>{scoreRef.current.fail} ratés</Text>
            </ScoresContainer>
            <ActionBar>
              <Button fullWidth onClick={onResolve}>
                OK !
              </Button>
            </ActionBar>
          </div>
        ),
      }))
      setStarted(false)
    },
  }
}

export default useScore
