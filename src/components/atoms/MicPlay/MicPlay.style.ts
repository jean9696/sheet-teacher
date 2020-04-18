import styled from 'styled-components'

import { palette, theme } from '@habx/ui-core'

export const MicPlayContainer = styled.div`
  background: ${palette.darkBlue[200]};
  border-radius: 100%;
  position: relative;
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 128px;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: solid 1px ${theme.color('secondary')};
    transform: scale(var(--scaleRatio));
  }
`
