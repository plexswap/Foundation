import { ChainId } from '@plexswap/chains'
import { Address, PublicClient, getContract } from 'viem'

import { iMulticallABI } from './abis/IMulticall'
import { MULTICALL3_ADDRESS, MULTICALL3_ADDRESSES, MULTICALL_ADDRESS } from './constants/contracts'

type Params = {
  chainId: ChainId
  client?: PublicClient
}

export function getMulticallContract({ chainId, client }: Params) {
  const address = MULTICALL_ADDRESS[chainId]
  if (!address) {
    throw new Error(`PlexswapMulticall not supported on chain ${chainId}`)
  }

  return getContract({ abi: iMulticallABI, address, client: client as PublicClient })
}

export function getMulticall3ContractAddress(chainId?: ChainId): Address {
  return MULTICALL3_ADDRESSES[chainId || ChainId.BSC] || MULTICALL3_ADDRESS
}