import { get, every } from 'lodash'
import qs from 'querystring'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

import { useConnectedUser, useRights } from '@habx/lib-client-acl'

import config from '@config'

const RedirectIfNotLoggedIn: React.FunctionComponent<RedirectIfNotLoggedInProps> = ({
  children,
}) => {
  const history = useHistory()
  const rights = useRights(
    [].map((permission) => ({ projectSlug: 'all', permission }))
  )

  const connectedUser = useConnectedUser()

  const canAccess = every(rights, (right) => right.isAuthorized)
  const rightsLoaded = every(rights, (right) => !right.loading)
  React.useEffect(() => {
    if (!connectedUser.loading && rightsLoaded) {
      if (canAccess && !!connectedUser.data) {
        if (window.Sentry) {
          window.Sentry.configureScope((scope) => {
            scope.setUser({
              id: get(connectedUser, 'id'),
              email: get(connectedUser, 'email'),
            })
          })
        }
      } else {
        const params = qs.stringify({
          psr: window.location.href,
        })
        window.location.href = `${config.get('routes.auth')}?${params}`
      }
    }
  }, [rightsLoaded, canAccess, connectedUser, history])
  if (!connectedUser.data || connectedUser.loading) return null
  return <React.Fragment>{children}</React.Fragment>
}

interface RedirectIfNotLoggedInProps {}

export default RedirectIfNotLoggedIn
