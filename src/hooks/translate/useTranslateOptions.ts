import { messageIds } from '@intl/types'
import * as React from 'react'

import useTranslate from './useTranslate'

const useTranslateOptions = <optionsType extends { label: messageIds }>(
  options: optionsType[]
) => {
  const t = useTranslate()
  return React.useMemo<(Omit<optionsType, 'label'> & { label: string })[]>(
    () => options.map((option) => ({ ...option, label: t(option.label) })),
    [options, t]
  )
}

export default useTranslateOptions
