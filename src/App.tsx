import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Providers, NavBar } from '@components/structure'

import { Template } from '@pages'
import GlobalTheme from '@style/global'

const App = () => {
  return (
    <Providers>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Template} />
        <Redirect exact path="/" to="/tpl" />
      </Switch>
      <GlobalTheme />
    </Providers>
  )
}

export default App
