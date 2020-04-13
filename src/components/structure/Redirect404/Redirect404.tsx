import * as qs from 'qs'
import * as React from 'react'

import config from '@config'

const Redirect404: React.FunctionComponent<Redirect404Interface> = ({
  params,
}) => {
  React.useEffect(() => {
    window.location.href = `${config.get(
      'routes.404'
    )}?light=true&${qs.stringify(params)}`
  }, [params])
  return null
}

interface Redirect404Interface {
  params?: any
}

export default Redirect404
