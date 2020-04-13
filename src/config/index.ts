import { has, get, mapValues } from 'lodash'

import baseConfig from './config.common'
import devConfig from './config.dev'
import prodConfig from './config.prod'

const buildConfig = () => {
  const envConfig =
    process.env.NODE_ENV === 'development' ? devConfig : prodConfig

  const walk = (obj, path = '') => {
    if (typeof obj !== 'object') {
      // eslint-disable-next-line no-console
      console.error('Invalid configuration : all config keys should be objects')
    }

    if (has(obj, 'default')) {
      if (has(obj, 'env')) {
        const envOverride = process.env[obj.env]

        if (envOverride) {
          return envOverride
        }
      }

      if (has(envConfig, path)) {
        return get(envConfig, path)
      }

      return obj.default
    }

    return mapValues(obj, (value, key) =>
      walk(value, `${path === '' ? '' : `${path}.`}${key}`)
    )
  }

  return walk(baseConfig)
}

const fullConfig = buildConfig()

export default {
  get: (path) => get(fullConfig, path),
}
