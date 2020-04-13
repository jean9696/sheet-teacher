import { ApolloProvider } from '@apollo/react-hooks'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { RightsProvider } from '@habx/lib-client-acl'
import { captureException } from '@habx/lib-client-reporting'
import { ThemeProvider, Provider, DesignSystemThemePatch } from '@habx/ui-core'

import Redirect404 from '@components/structure/Redirect404'

import { buildApolloClient } from '@api'
import Rights from '@lib/rights'

import FormHelperProvider from './FormHelperProvider'
import { ProviderContainer } from './Provider.style'

const apolloClient = buildApolloClient()

const INITIAL_RIGHTS = {
  all: Object.values(Rights),
}

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
    captureException(error, errorInfo)
  }

  render() {
    const { children } = this.props
    const { error } = this.state

    if (error) {
      if (['local', 'dev'].includes(window.HABX_ENV)) {
        return error.toString()
      }
      return <Redirect404 params={{ statusCode: 500 }} />
    }

    return (
      <RightsProvider loader={null} initialRights={INITIAL_RIGHTS}>
        <Provider>
          <ThemeProvider theme={theme}>
            <FormHelperProvider>
              <BrowserRouter basename="/tpl">
                <ApolloProvider client={apolloClient}>
                  <ProviderContainer>
                    <React.Suspense fallback={null}>{children}</React.Suspense>
                  </ProviderContainer>
                </ApolloProvider>
              </BrowserRouter>
            </FormHelperProvider>
          </ThemeProvider>
        </Provider>
      </RightsProvider>
    )
  }
}

export default Providers
