import styled from 'styled-components'

import { Background, Card, HeaderBar } from '@habx/ui-core'

import { smallBreakpoint } from '@lib/breakpoints'

export const HomeContainer = styled(Background)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  @media (${smallBreakpoint}) {
    overflow-y: hidden;
  }
`

export const HomeHeaderBar = styled(HeaderBar)`
  @media (${smallBreakpoint}) {
    display: none;
  }
`

export const HomeContent = styled.div`
  padding: 24px 32px;
  height: 100%;
  @media (${smallBreakpoint}) {
    padding: 0;
  }
`

export const ModesContainer = styled.div`
  display: flex;
  > * {
    margin-right: 12px;
  }
`

export const GameContent = styled.div`
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 700px;
`

export const TimerContainer = styled.div`
  @media (${smallBreakpoint}) {
    position: absolute;
    left: 12px;
    bottom: 12px;
  }
`

export const StaveContainer = styled(Card)`
  margin: 24px 0;
  @media (${smallBreakpoint}) {
    margin: 6px 0;
  }
`

export const SmallConfigConfigContainer = styled.div`
  display: none;
  @media (${smallBreakpoint}) {
    display: initial;
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
`
