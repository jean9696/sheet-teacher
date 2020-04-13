interface Window {
  HABX_ENV: 'prod' | 'dev' | 'staging' | 'local'
  VERSION: string
  puppeteer: boolean
  __router__: object
  Sentry: {
    configureScope: Function
  }
}
