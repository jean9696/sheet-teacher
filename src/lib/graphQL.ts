import { map, reduce, isNil } from 'lodash'

export const removeTypeNames = <D extends unknown>(
  data: D
): Pick<D, Exclude<keyof D, '__typename'>> => {
  if (typeof data !== 'object' || isNil(data) || data instanceof Date) {
    return data
  }

  if (Array.isArray(data)) {
    return map(data, removeTypeNames) as D
  }
  return reduce(
    data as D & object,
    (acc, value, key) => {
      if (key === '__typename') {
        return acc
      }

      return {
        ...acc,
        [key]: removeTypeNames(value),
      }
    },
    {}
  ) as D
}
