import { ChainId } from '@plexswap/chains'
import { Currency, CurrencyAmount, Native, Token, WNATIVE } from '@plexswap/sdk-core'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId): Token | undefined {
  return currency?.isNative ? WNATIVE[chainId] : currency?.isToken ? currency : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount<Currency> | undefined,
  chainId: ChainId | undefined,
): CurrencyAmount<Token> | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? CurrencyAmount.fromRawAmount(token, currencyAmount.quotient) : undefined
}

export function unwrappedToken(token: Currency): Currency {
  if (token.isNative) {
    return token
  }

  if (token.equals(WNATIVE[token.chainId as ChainId])) return Native.onChain(token.chainId)
  return token
}
