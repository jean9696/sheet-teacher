export default {
  name: 'dev',
  api: {},
  routes: {
    auth: 'https://www.habx-dev.com/auth/login',
    logout: 'https://www.habx-dev.com/api/accounts/auth/signout',
    404: 'https://www.habx-dev.com/oops',
  },
  sentry: {
    enabled: false,
  },
}
