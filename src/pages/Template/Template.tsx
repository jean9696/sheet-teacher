import * as React from 'react'

import { Title } from '@habx/ui-core'

const Template: React.FunctionComponent<TemplateInterface> = () => {
  return (
    <Title type="article" style={{ margin: 'auto' }}>
      Hello world !{' '}
      <span role="img" aria-label={'hello'}>
        🌞
      </span>
    </Title>
  )
}

interface TemplateInterface {}

export default Template
