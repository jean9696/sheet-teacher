import styled from 'styled-components'

import { Background } from '@habx/ui-core'

export const PageContainer = styled(Background)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const PageContent = styled.div`
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
`
