import { ChainId } from '@plexswap/chains'
import { BoosterConfig } from '../../utils/boosted/types'


export type BoostedPoolsConfigByChain<TChainId extends ChainId> = {
  [chainId in TChainId]?: BoosterConfig[]
}

export const BOOSTED_POOLS_CONFIG_BY_CHAIN = {

} as BoostedPoolsConfigByChain<ChainId>

export const getBoostedPoolsConfig = (chainId: ChainId) => {
  return BOOSTED_POOLS_CONFIG_BY_CHAIN[chainId]
}

export const getBoostedPoolConfig = (chainId: ChainId, contractAddress: string): BoosterConfig | undefined => {
  const pool = getBoostedPoolsConfig(chainId)
  return pool?.find((i) => i?.contractAddress?.toLowerCase() === contractAddress.toLowerCase())
}
