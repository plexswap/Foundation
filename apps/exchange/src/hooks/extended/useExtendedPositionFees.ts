import { Currency, CurrencyAmount } from '@plexswap/sdk-core'
import { Pool } from '@plexswap/sdk-extended'
import { useExtendedNFTPositionManagerContract } from 'hooks/useContract'
import { useEffect, useMemo, useState } from 'react'
import { useCurrentBlock } from 'state/block/hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { unwrappedToken } from 'utils/wrappedCurrency'

const MAX_UINT128 = 2n ** 128n - 1n

// compute current + counterfactual fees for a extended position
export function useExtendedPositionFees(
  pool?: Pool,
  tokenId?: bigint,
  asWNATIVE = false,
): [CurrencyAmount<Currency>, CurrencyAmount<Currency>] | [undefined, undefined] {
  const positionManager = useExtendedNFTPositionManagerContract()
  const owner = useSingleCallResult({
    contract: tokenId ? positionManager : null,
    functionName: 'ownerOf',
    args: useMemo(() => [tokenId!] as const, [tokenId]),
  }).result

  const latestBlockNumber = useCurrentBlock()

  // we can't use multicall for this because we need to simulate the call from a specific address
  // latestBlockNumber is included to ensure data stays up-to-date every block
  const [amounts, setAmounts] = useState<[bigint, bigint] | undefined>()
  useEffect(() => {
    if (positionManager && typeof tokenId !== 'undefined' && owner) {
      positionManager.simulate
        .collect(
          [
            {
              tokenId,
              recipient: owner, // some tokens might fail if transferred to address(0)
              amount0Max: MAX_UINT128,
              amount1Max: MAX_UINT128,
            },
          ],
          { account: owner, value: 0n }, // need to simulate the call as the owner
        )
        .then((results) => {
          const [amount0, amount1] = results.result
          setAmounts([amount0, amount1])
        })
    }
  }, [positionManager, owner, latestBlockNumber, tokenId])

  if (pool && amounts) {
    return [
      CurrencyAmount.fromRawAmount(asWNATIVE ? pool.token0 : unwrappedToken(pool.token0)!, amounts[0].toString()),
      CurrencyAmount.fromRawAmount(asWNATIVE ? pool.token1 : unwrappedToken(pool.token1)!, amounts[1].toString()),
    ]
  }
  return [undefined, undefined]
}
