import styled from 'styled-components'

import { palette } from '@habx/ui-core'

export const ScoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
`

export const StarsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  font-size: 42px;
  color: ${palette.yellow[500]};
`
