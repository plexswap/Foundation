import { getPermit2Address } from "@plexswap/hub-center/Licentia"
import { Currency, Token } from '@plexswap/sdk-core'
import { Address } from 'viem'
import { useActiveChainId } from './useActiveChainId'
import useTokenAllowance from './useTokenAllowance'

export const usePermit2Allowance = (owner?: Address, token?: Currency) => {
  const { chainId } = useActiveChainId()
  const { allowance, refetch } = useTokenAllowance(
    token?.isNative ? undefined : (token as Token),
    owner,
    getPermit2Address(chainId),
  )
  return { allowance, refetch }
}
