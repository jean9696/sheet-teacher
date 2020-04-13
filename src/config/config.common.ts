const getSegmentKey = () => {
  console.warn('Don\'t forget to configure Sentry !') // eslint-disable-line
  switch (window.HABX_ENV) {
    case 'prod':
      return ''
    case 'staging':
      return ''
    case 'local':
      return ''
    default:
      return ''
  }
}

export default {
  name: {
    default: 'default',
  },
  api: {
    auth: {
      default: '/api/accounts/auth',
    },
  },
  routes: {
    auth: {
      default: '/auth/login',
    },
    logout: {
      default: '/api/accounts/auth/signout',
    },
    organizationAuth: {
      default: '/auth/:organizationSlug/login',
    },
    ace: {
      default: '/ace',
    },
    cms: {
      default: '/cms',
    },
    salesTool: {
      default: '/match',
    },
    404: {
      default: '/oops',
    },
  },
  segment: {
    writeKey: {
      default: getSegmentKey(),
    },
  },
  sentry: {
    enabled: {
      default: true,
    },
  },
  cube: {
    token: {
      default: 'test',
    },
  },
}
