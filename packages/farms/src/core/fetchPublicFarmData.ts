import { ChainId } from '@plexswap/chains'
import { Address, PublicClient } from 'viem'
import chunk from 'lodash/chunk'
import { SerializedFarmPublicData, SerializedFarmConfig } from '../types'
import { specialVaultAddresses } from '../constants'

const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
] as const

const fetchFarmCalls = (farm: SerializedFarmPublicData, chiefFarmerAddress: string, vaultAddress?: string) => {
  const { lpAddress, token, quoteToken } = farm
  return [
    // Balance of token in the LP contract
    {
      abi,
      address: token.address,
      functionName: 'balanceOf',
      args: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      abi,
      address: quoteToken.address,
      functionName: 'balanceOf',
      args: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      abi,
      address: lpAddress,
      functionName: 'balanceOf',
      args: [(vaultAddress || chiefFarmerAddress) as Address],
    },
    // Total supply of LP tokens
    {
      abi,
      address: lpAddress,
      functionName: 'totalSupply',
    },
  ] as const
}

export const fetchPublicFarmsData = async (
  farms: SerializedFarmConfig[],
  chainId = ChainId.BSC,
  provider: ({ chainId }: { chainId: number }) => PublicClient,
  chiefFarmerAddress: string,
) => {
  try {
    const farmCalls = farms.flatMap((farm) =>
      fetchFarmCalls(farm, chiefFarmerAddress, specialVaultAddresses[chainId as keyof typeof specialVaultAddresses]),
    )
    const chunkSize = farmCalls.length / farms.length
    const farmMultiCallResult = await provider({ chainId }).multicall({ contracts: farmCalls, allowFailure: false })
    return chunk(farmMultiCallResult, chunkSize) as [bigint, bigint, bigint, bigint][]
  } catch (error) {
    console.error('ChiefFarmer Public Data error ', error)
    throw error
  }
}
