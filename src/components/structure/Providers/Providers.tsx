import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider, Provider, DesignSystemThemePatch } from '@habx/ui-core'

import FormHelperProvider from './FormHelperProvider'
import { ProviderContainer } from './Provider.style'

const theme: DesignSystemThemePatch = {}

class Providers extends React.PureComponent {
  static getDerivedStateFromError(error) {
    return {
      error,
    }
  }

  state = {
    error: null,
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo) // eslint-disable-line
  }

  render() {
    const { children } = this.props
    const { error } = this.state

    if (error) {
      return error.toString()
    }

    return (
      <Provider>
        <ThemeProvider theme={theme}>
          <FormHelperProvider>
            <BrowserRouter basename="/">
              <ProviderContainer>
                <React.Suspense fallback={null}>{children}</React.Suspense>
              </ProviderContainer>
            </BrowserRouter>
          </FormHelperProvider>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default Providers
