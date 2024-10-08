import { getPoolAddress } from '../../Ananke/utils'
import { AetherRoute } from '../types'

export function isSameRoute(one: AetherRoute, another: AetherRoute) {
  if (one.pools.length !== another.pools.length) {
    return false
  }
  for (const [index, p] of one.pools.entries()) {
    if (p.type !== another.pools[index].type) {
      return false
    }
    if (getPoolAddress(p) !== getPoolAddress(another.pools[index])) {
      return false
    }
  }
  return true
}

// Must to be the same route
export function mergeRoute(one: AetherRoute, another: AetherRoute): AetherRoute {
  return {
    ...one,
    inputAmount: one.inputAmount.add(another.inputAmount),
    outputAmount: one.outputAmount.add(another.outputAmount),
    gasUseEstimateQuote: another.gasUseEstimateQuote
      ? one.gasUseEstimateQuote?.add(another.gasUseEstimateQuote)
      : one.gasUseEstimateQuote,
    gasUseEstimate: one.gasUseEstimate + another.gasUseEstimate,
    inputAmountWithGasAdjusted: another.inputAmountWithGasAdjusted
      ? one.inputAmountWithGasAdjusted?.add(another.inputAmountWithGasAdjusted)
      : one.inputAmountWithGasAdjusted,
    outputAmountWithGasAdjusted: another.outputAmountWithGasAdjusted
      ? one.outputAmountWithGasAdjusted?.add(another.outputAmountWithGasAdjusted)
      : one.outputAmountWithGasAdjusted,
    percent: one.percent + another.percent,
  }
}
