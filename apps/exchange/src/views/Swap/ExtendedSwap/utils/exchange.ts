import { Fraction, Currency, CurrencyAmount, ONE_HUNDRED_PERCENT, Percent, Price, Token, TradeType, ZERO } from '@plexswap/sdk-core'
import { FeeAmount } from '@plexswap/sdk-extended'
import { Route, SmartRouter, SmartRouterTrade } from '@plexswap/gateway-guardians/Ananke'
import { formatPrice, parseNumberToFraction } from '@plexswap/utils/formatFractions'
import { BIPS_BASE, INPUT_FRACTION_AFTER_FEE } from 'config/constants/exchange'
import { Field } from 'state/swap/actions'
import { basisPointsToPercent } from 'utils/exchange'

export type SlippageAdjustedAmounts = {
  [field in Field]?: CurrencyAmount<Currency> | null
}

// computes the minimum amount out and maximum amount in for a trade given a user specified allowed slippage in bips
export function computeSlippageAdjustedAmounts(
  trade: Pick<SmartRouterTrade<TradeType>, 'inputAmount' | 'outputAmount' | 'tradeType'> | undefined | null,
  allowedSlippage: number,
): SlippageAdjustedAmounts {
  const pct = basisPointsToPercent(allowedSlippage)

  return {
    [Field.INPUT]: trade && SmartRouter.maximumAmountIn(trade, pct),
    [Field.OUTPUT]: trade && SmartRouter.minimumAmountOut(trade, pct),
  }
}

export type TradeEssentialForPriceBreakdown = Pick<SmartRouterTrade<TradeType>, 'inputAmount' | 'outputAmount'> & {
  routes: Pick<Route, 'percent' | 'pools' | 'path' | 'inputAmount'>[]
}

// computes price breakdown for the trade
export function computeTradePriceBreakdown(trade?: TradeEssentialForPriceBreakdown | null): {
  priceImpactWithoutFee?: Percent | null
  lpFeeAmount?: CurrencyAmount<Currency> | null
} {
  if (!trade) {
    return {
      priceImpactWithoutFee: undefined,
      lpFeeAmount: null,
    }
  }

  const { routes, outputAmount, inputAmount } = trade
  let feePercent = new Percent(0)
  let outputAmountWithoutPriceImpact = CurrencyAmount.fromRawAmount(trade.outputAmount.wrapped.currency, 0)
  for (const route of routes) {
    const { inputAmount: routeInputAmount, pools, percent } = route
    const routeFeePercent = ONE_HUNDRED_PERCENT.subtract(
      pools.reduce<Percent>((currentFee, pool) => {
        if (SmartRouter.isCorePool(pool)) {
          return currentFee.multiply(INPUT_FRACTION_AFTER_FEE)
        }
        if (SmartRouter.isStablePool(pool)) {
          return currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(pool.fee))
        }
        return currentFee
      }, ONE_HUNDRED_PERCENT),
    )
    // Not accurate since for stable swap, the lp fee is deducted on the output side
    feePercent = feePercent.add(
      routeFeePercent.multiply(Percent.toPercent(parseNumberToFraction(percent / 100) || new Fraction(0))),
    )

    const midPrice = SmartRouter.getMidPrice(route)
    outputAmountWithoutPriceImpact = outputAmountWithoutPriceImpact.add(
      midPrice.quote(routeInputAmount.wrapped) as CurrencyAmount<Token>,
    )
  }

  if (outputAmountWithoutPriceImpact.quotient === ZERO) {
    return {
      priceImpactWithoutFee: undefined,
      lpFeeAmount: null,
    }
  }

  const priceImpactRaw = outputAmountWithoutPriceImpact
    .subtract(outputAmount.wrapped)
    .divide(outputAmountWithoutPriceImpact)
  const priceImpactPercent = new Percent(priceImpactRaw.numerator, priceImpactRaw.denominator)
  const priceImpactWithoutFee = priceImpactPercent.subtract(feePercent)
  const lpFeeAmount = inputAmount.multiply(feePercent)

  return {
    priceImpactWithoutFee,
    lpFeeAmount,
  }
}

export function formatExecutionPrice(
  executionPrice?: Price<Currency, Currency>,
  inputAmount?: CurrencyAmount<Currency>,
  outputAmount?: CurrencyAmount<Currency>,
  inverted?: boolean,
): string {
  if (!executionPrice || !inputAmount || !outputAmount) {
    return ''
  }
  return inverted
    ? `${formatPrice(executionPrice.invert(), 6)} ${inputAmount.currency.symbol} / ${outputAmount.currency.symbol}`
    : `${formatPrice(executionPrice, 6)} ${outputAmount.currency.symbol} / ${inputAmount.currency.symbol}`
}

export function extendedFeeToPercent(fee: FeeAmount): Percent {
  return new Percent(fee, BIPS_BASE * 100n)
}
