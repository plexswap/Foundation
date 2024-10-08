import { Currency, Price } from '@plexswap/sdk-core'

import { BaseRoute, Pool, PoolType, Route, RouteType } from '../types'
import { getOutputCurrency, getTokenPrice } from './pool'

export function buildBaseRoute(pools: Pool[], currencyIn: Currency, currencyOut: Currency): BaseRoute {
  const path: Currency[] = [currencyIn.wrapped]
  let prevIn = path[0]
  let routeType: RouteType | null = null
  const updateRouteType = (pool: Pool, currentRouteType: RouteType | null) => {
    if (currentRouteType === null) {
      return getRouteTypeFromPool(pool)
    }
    if (currentRouteType === RouteType.MIXED || currentRouteType !== getRouteTypeFromPool(pool)) {
      return RouteType.MIXED
    }
    return currentRouteType
  }
  for (const pool of pools) {
    prevIn = getOutputCurrency(pool, prevIn)
    path.push(prevIn)
    routeType = updateRouteType(pool, routeType)
  }

  if (routeType === null) {
    throw new Error(`Invalid route type when constructing base route`)
  }

  return {
    path,
    pools,
    type: routeType,
    input: currencyIn,
    output: currencyOut,
  }
}

function getRouteTypeFromPool(pool: Pool) {
  switch (pool.type) {
    case PoolType.CORE:
      return RouteType.CORE
    case PoolType.EXTENDED:
      return RouteType.EXTENDED
    case PoolType.STABLE:
      return RouteType.STABLE
    default:
      return RouteType.MIXED
  }
}

export function getQuoteCurrency({ input, output }: BaseRoute, baseCurrency: Currency) {
  return baseCurrency.equals(input) ? output : input
}

export function getMidPrice({ path, pools }: Pick<Route, 'path' | 'pools'>) {
  let i = 0
  let price: Price<Currency, Currency> | null = null
  for (const pool of pools) {
    const input = path[i].wrapped
    const output = path[i + 1].wrapped
    const poolPrice = getTokenPrice(pool, input, output)

    price = price ? price.multiply(poolPrice) : poolPrice
    i += 1
  }

  if (!price) {
    throw new Error('Get mid price failed')
  }
  return price
}
