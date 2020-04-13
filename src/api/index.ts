import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { Envs, getEndpoints } from '@habx/graphql-config'
import { buildApolloLinkError } from '@habx/lib-client-reporting'

const headerFrom = 'client-sales-tool'
console.warn('Don\'t forget to configure headerFrom !') // eslint-disable-line


export const buildApolloClient = () => {
  let defaultCredentials: RequestCredentials = window.location.origin.includes(
    'localhost'
  )
    ? 'include'
    : 'same-origin'

  return new ApolloClient({
    name: headerFrom,
    version: window.VERSION,
    link: ApolloLink.from([
      buildApolloLinkError({ dev: window.HABX_ENV !== 'prod' }),
      new MultiAPILink(getEndpoints(window.HABX_ENV as Envs)),
      new HttpLink({
        credentials: defaultCredentials,
        headers: {
          'X-Request-From': headerFrom,
        },
      }),
    ]),
    cache: new InMemoryCache(),
  })
}
