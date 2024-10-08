import {
    CurrencyParams,
    CurrencyUsdResult,
    getCurrencyKey,
    getCurrencyListUsdPrice,
} from '@plexswap/trade-sentinels/Valorus'
import { create, windowScheduler } from '@yornaath/batshit'

export const usdPriceBatcher = create<CurrencyUsdResult, CurrencyParams, number>({
  // The fetcher resolves the list of queries to one single api call.
  fetcher: async (params: CurrencyParams[]) => {
    return getCurrencyListUsdPrice(params)
  },
  // when we call usdPriceBatcher.fetch, this will resolve the correct currency from the result.
  resolver(items, query) {
    const key = getCurrencyKey(query)
    if (!key) return 0
    return items[key] ?? 0
  },
  // this will batch all calls to users.fetch that are made within 60 milliseconds.
  scheduler: windowScheduler(60),
})
