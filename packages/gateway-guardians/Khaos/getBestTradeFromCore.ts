import { Currency, CurrencyAmount, Pair, Trade, TradeType, isTradeBetter } from '@plexswap/sdk-core'
import { BETTER_TRADE_LESS_HOPS_THRESHOLD } from '../config/constants'
import { getAllCommonPairs as defaultGetAllCommonPairs } from './getAllCommonPairs'
import { BestTradeOptions } from './types'

export const getBestTradeFromCoreExactIn = createGetBestTradeFromCore(TradeType.EXACT_INPUT)

export const getBestTradeFromCoreExactOut = createGetBestTradeFromCore(TradeType.EXACT_OUTPUT)

export async function getBestTradeFromCore<
  TInput extends Currency,
  TOutput extends Currency,
  TTradeType extends TradeType,
>(amountIn: CurrencyAmount<TInput>, output: TOutput, tradeType: TTradeType, options: BestTradeOptions) {
  const getBestTrade = tradeType === TradeType.EXACT_INPUT ? getBestTradeFromCoreExactIn : getBestTradeFromCoreExactOut

  return getBestTrade(amountIn, output, options)
}

function createGetBestTradeFromCore<TTradeType extends TradeType>(tradeType: TTradeType) {
  function getBestTrade<In extends Currency, Out extends Currency>(
    pairs: Pair[],
    amountIn: CurrencyAmount<In>,
    output: Out,
    options: Omit<BestTradeOptions, 'provider' | 'getAllCommonPairs'>,
  ) {
    if (tradeType === TradeType.EXACT_INPUT) {
      return Trade.bestTradeExactIn(pairs, amountIn, output, options)
    }
    return Trade.bestTradeExactOut(pairs, output, amountIn, options)
  }

  return async function bestTradeFromCore<In extends Currency, Out extends Currency>(
    amountIn: CurrencyAmount<In>,
    output: Out,
    options: BestTradeOptions,
  ) {
    const { provider, allCommonPairs, ...restOptions } = options
    const { maxHops = 3 } = restOptions
    const getAllowedPairs = async () => {
      if (Array.isArray(allCommonPairs)) {
        return allCommonPairs
      }
      if (allCommonPairs) {
        return allCommonPairs(amountIn.currency, output)
      }
      return defaultGetAllCommonPairs(amountIn.currency, output, { provider })
    }
    const allowedPairs = await getAllowedPairs()

    if (!allowedPairs.length) {
      return null
    }

    if (maxHops === 1) {
      return getBestTrade(allowedPairs, amountIn, output, restOptions)[0] ?? null
    }

    // search through trades with varying hops, find best trade out of them
    let bestTradeSoFar: ReturnType<typeof getBestTrade<In, Out>>[number] | null = null
    for (let i = 1; i <= maxHops; i++) {
      const currentTrade: ReturnType<typeof getBestTrade<In, Out>>[number] | null =
        getBestTrade(allowedPairs, amountIn, output, {
          ...restOptions,
          maxHops: i,
          maxNumResults: 1,
        })[0] ?? null
      // if current trade is best yet, save it
      if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
        bestTradeSoFar = currentTrade
      }
    }
    return bestTradeSoFar
  }
}
