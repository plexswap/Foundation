import { ChainId } from '@plexswap/chains'

export const DEFAULT_GAS_LIMIT = 150000000n

export const DEFAULT_GAS_LIMIT_BY_CHAIN: { [key in ChainId]?: bigint } = {
  [ChainId.BSC]: 100000000n,
  [ChainId.PLEXCHAIN]: DEFAULT_GAS_LIMIT,
}

export const DEFAULT_GAS_BUFFER = 3000000n

export const DEFAULT_GAS_BUFFER_BY_CHAIN: { [key in ChainId]?: bigint } = {
  [ChainId.BSC]: DEFAULT_GAS_BUFFER,
  [ChainId.PLEXCHAIN]: DEFAULT_GAS_BUFFER,
}
