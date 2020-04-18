import { messageIds } from '@intl/types'

import { buildIntl } from '@habx/lib-client-intl'

export const { useTranslate, IntlProvider } = buildIntl<messageIds>({
  prefix: 'client',
  isRoot: true,
})

export default useTranslate
