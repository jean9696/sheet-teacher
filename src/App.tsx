import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { launchSentry } from '@habx/lib-client-reporting'

import {
  Providers,
  RedirectIfNotLoggedIn,
  Redirect404,
  NavBar,
} from '@components/structure'

import config from '@config'
import { Template } from '@pages'
import GlobalTheme from '@style/global'

if (config.get('sentry.enabled')) {
  launchSentry({
    dsn: 'https://a8ba2e5b773a44bbb0628ff926e32bdd@sentry.io/1881528',
    release: window.VERSION,
    environment: window.HABX_ENV,
  })
}

const App = () => {
  return (
    <Providers>
      <RedirectIfNotLoggedIn>
        <NavBar />
        <Switch>
          <Route exact path="/tpl" component={Template} />
          <Redirect exact path="/" to="/tpl" />
          <Route path={`/`} component={Redirect404} />
        </Switch>
      </RedirectIfNotLoggedIn>
      <GlobalTheme />
    </Providers>
  )
}

export default App
