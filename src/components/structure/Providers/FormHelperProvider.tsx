import * as React from 'react'
import styled from 'styled-components'

import { FormHelperProvider as DefaultFormHelperProvider } from '@habx/lib-form-helper'
import { theme as UICoreTheme, useTheme } from '@habx/ui-core'

const ErrorContainer = styled.div<{ padding?: number }>`
  color: ${UICoreTheme.color('warning')};
  padding-top: ${({ padding }) => padding ?? 8}px;
  padding-left: ${({ padding }) => padding ?? 8}px;
  font-size: 12px;
`

const FormHelperProvider: React.FunctionComponent<FormHelperProviderInterface> = ({
  children,
}) => {
  const theme = useTheme()
  return (
    <DefaultFormHelperProvider
      errors={{ color: theme.colors.warning.base, component: ErrorContainer }}
    >
      {children}
    </DefaultFormHelperProvider>
  )
}

interface FormHelperProviderInterface {}

export default FormHelperProvider
