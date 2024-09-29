import { ChainId } from '@plexswap/chains'

export const SUPPORTED_CHAINS = [
  ChainId.BSC,
  ChainId.BSC_TESTNET,
  ChainId.PLEXCHAIN,
] as const

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number]
