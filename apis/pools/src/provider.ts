import { ChainId, getExtendedSubgraphs, bsc, bscTestnet, plexchain } from '@plexswap/chains'
import { OnChainProvider, SubgraphProvider } from '@plexswap/gateway-guardians'
import { createPublicClient, http } from 'viem'
import { GraphQLClient } from 'graphql-request'

import { SupportedChainId } from './constants'

const requireCheck = [ PLEXCHAIN_NODE, BSC_NODE, BSC_TESTNET_NODE, THE_GRAPH_API_KEY]
requireCheck.forEach((node) => {
  if (!node) {
    throw new Error('Missing env var')
  }
})

const EXTENDED_SUBGRAPHS = getExtendedSubgraphs({
  theGraphApiKey: THE_GRAPH_API_KEY,
})

const bscClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_NODE),
})

const bscTestnetClient = createPublicClient({
  chain: bscTestnet,
  transport: http(BSC_TESTNET_NODE),
})

const plexchainClient = createPublicClient({
  chain: plexchain,
  transport: http(PLEXCHAIN_NODE),
})

// @ts-ignore
export const viemProviders: OnChainProvider = ({ chainId }: { chainId?: ChainId }) => {
  switch (chainId) {
    case ChainId.BSC:
      return bscClient
    case ChainId.BSC_TESTNET:
      return bscTestnetClient
    case ChainId.PLEXCHAIN:
      return plexchainClient
    default:
      return bscClient
  }
}

export const extendedSubgraphClients: Record<SupportedChainId, GraphQLClient> = {
  [ChainId.BSC]: new GraphQLClient(EXTENDED_SUBGRAPHS[ChainId.BSC], { fetch }),
  [ChainId.BSC_TESTNET]: new GraphQLClient(EXTENDED_SUBGRAPHS[ChainId.BSC_TESTNET], { fetch }),
  [ChainId.PLEXCHAIN]: new GraphQLClient(EXTENDED_SUBGRAPHS[ChainId.PLEXCHAIN], { fetch }),

} as const

export const extendedSubgraphProvider: SubgraphProvider = ({ chainId = ChainId.BSC }: { chainId?: ChainId }) => {
  return extendedSubgraphClients[chainId as SupportedChainId] || extendedSubgraphClients[ChainId.BSC]
}
