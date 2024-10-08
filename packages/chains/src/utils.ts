import { ChainId, testnetChainIds } from './chainId'
import {
  chainNameToChainId,
  chainNames,
  chainNamesInKebabCase,
  defiLlamaChainNames,
  mainnetChainNamesInKebabCase,
} from './chainNames'

export function getChainName(chainId: ChainId) {
  return chainNames[chainId]
}

export function getChainNameInKebabCase(chainId: ChainId) {
  return chainNamesInKebabCase[chainId]
}

export function getMainnetChainNameInKebabCase(chainId: keyof typeof mainnetChainNamesInKebabCase) {
  return mainnetChainNamesInKebabCase[chainId]
}

export function getLlamaChainName(chainId: ChainId) {
  return defiLlamaChainNames[chainId]
}

export function getChainIdByChainName(chainName?: string): ChainId | undefined {
  if (!chainName) return undefined
  return chainNameToChainId[chainName] ?? undefined
}

export const verifyBscNetwork = (chainId?: number) => {
  return Boolean(chainId && (chainId === ChainId.BSC || chainId === ChainId.BSC_TESTNET))
}

export function verifyTestnet(chainId: ChainId) {
  return testnetChainIds.includes(chainId)
}
