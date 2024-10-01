import { ChainId } from '@plexswap/chains'
import addresses from 'config/constants/contracts'
import { EXTENDED_SUBGRAPH_URLS, STABLESWAP_SUBGRAPHS_URLS, CORE_SUBGRAPH_URLS } from 'config/constants/endpoints'
import dayjs, { Dayjs } from 'dayjs'
import { GraphQLClient, gql } from 'graphql-request'
import { multiChainName } from 'state/info/constant'
import { getWayaVaultAddress } from 'utils/addressHelpers'
import { getWayaContract } from 'utils/contractHelpers'
import { getBlocksFromTimestamps } from 'utils/getBlocksFromTimestamps'
import { bitQueryServerClient } from 'utils/graphql'
import { formatEther } from 'viem'

// Values fetched from TheGraph and BitQuery jan 24, 2022
const txCount = 54780336
const addressCount = 4425459
const tvl = 6082955532.115718

export const getTotalTvl = async () => {
  const results = {
    totalTx30Days: txCount,
    addressCount30Days: addressCount,
    tvl,
  }
  try {
    const days30Ago = dayjs().subtract(30, 'days')

    const stableProdClients = getProdClients(STABLESWAP_SUBGRAPHS_URLS)
    const extendedProdClients = getProdClients(EXTENDED_SUBGRAPH_URLS)
    const coreProdClients = getProdClients(CORE_SUBGRAPH_URLS)

    try {
      const { coreTotalTx, coreTotal30DaysAgoTx } = await getCoreTotalTx(coreProdClients, days30Ago)
      const { stableTotalTx, stableTotal30DaysAgoTx } = await getStableTotalTx(stableProdClients, days30Ago)
      const { extendedTotalTx, extendedTotal30DaysAgoTx } = await getExtendedTotalTx(extendedProdClients, days30Ago)

      const totalTx = parseInt(extendedTotalTx + coreTotalTx + stableTotalTx)
      const totalTx30DaysAgo = parseInt(extendedTotal30DaysAgoTx + coreTotal30DaysAgoTx + stableTotal30DaysAgoTx)

      if (totalTx && totalTx30DaysAgo && totalTx > totalTx30DaysAgo) {
        results.totalTx30Days = totalTx - totalTx30DaysAgo
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Error when fetching total tx count', error)
      }
    }

    const usersQuery = gql`
      query userCount($since: ISO8601DateTime, $till: ISO8601DateTime) {
        ethereum: ethereum(network: ethereum) {
          dexTrades(
            exchangeName: { in: ["Plexswap", "Plexswap Core", "Plexswap"] }
            date: { since: $since, till: $till }
          ) {
            count(uniq: senders)
          }
        }
        bsc: ethereum(network: bsc) {
          dexTrades(
            exchangeName: { in: ["Plexswap", "Plexswap Core", "Plexswap"] }
            date: { since: $since, till: $till }
          ) {
            count(uniq: senders)
          }
        }
      }
    `

    if (process.env.BIT_QUERY_HEADER) {
      try {
        let querySuccess = false
        const queryResult = await bitQueryServerClient.request<any>(usersQuery, {
          since: days30Ago.toISOString(),
          till: new Date().toISOString(),
        })
        Object.keys(queryResult).forEach((key) => {
          if (!querySuccess) {
            results.addressCount30Days = queryResult[key].dexTrades[0].count
          } else {
            results.addressCount30Days += queryResult[key].dexTrades[0].count
          }
          querySuccess = true
        })
      } catch (error) {
        if (process.env.NODE_ENV === 'production') {
          console.error('Error when fetching address count', error)
        }
      }
    }

    const extendedTvl = await getExtendedTvl(extendedProdClients.map(({ client }) => client))
    const stableTvl = await getStableTvl(stableProdClients.map(({ client }) => client))
    const coreTvl = await getCoreTvl(coreProdClients.map(({ client }) => client))

    const waya = await (await fetch('https://farms-api.plexfinance.us/price/waya')).json()
    const wayaVaultCore = getWayaVaultAddress()
    const wayaContract = getWayaContract()
    const totalWayaInVault = await wayaContract.read.balanceOf([wayaVaultCore])
    const totalWayaInVE = await wayaContract.read.balanceOf([addresses.voter[ChainId.BSC]])
    results.tvl =
      parseFloat(formatEther(totalWayaInVault)) * waya.price +
      parseFloat(formatEther(totalWayaInVE)) * waya.price +
      extendedTvl +
      stableTvl +
      coreTvl
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error('Error when fetching tvl stats', error)
    }
  }
  return results
}

const getExtendedTotalTx = async (extendedProdClients: { chainId: string; client: GraphQLClient }[], days30Ago: Dayjs) => {
  const totalTxExtendedQuery = gql`
    query TotalTransactions($block: Block_height) {
      factories(block: $block) {
        txCount
      }
    }
  `

  const extendedTotalTxResults: any[] = (
    await Promise.all(
      extendedProdClients.map(async ({ client }) => {
        let result
        try {
          result = await client.request<any>(totalTxExtendedQuery)
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  const extendedTotalTx30DaysAgoResults: any[] = (
    await Promise.all(
      extendedProdClients.map(async ({ chainId, client }) => {
        let result
        try {
          const [days30AgoBlock] = await getBlocksFromTimestamps(
            [days30Ago.unix()],
            undefined,
            undefined,
            multiChainName[chainId],
          )
          if (!days30AgoBlock) {
            throw new Error('No block found for 30 days ago')
          }
          result = await client.request<any>(totalTxExtendedQuery, {
            block: {
              number: days30AgoBlock.number,
            },
          })
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  const extendedTotalTx = extendedTotalTxResults
    .map((factories) => {
      return factories.factories?.[0]
    })
    .filter(Boolean)
    .map((transactions) => {
      return transactions.txCount
    })
    .reduce((acc, extendedTx) => acc + parseFloat(extendedTx), 0)

  const extendedTotal30DaysAgoTx = extendedTotalTx30DaysAgoResults
    .map((factories) => {
      return factories.factories?.[0]
    })
    .filter(Boolean)
    .map((transactions) => {
      return transactions.txCount
    })
    .reduce((acc, extendedTx30DaysAgo) => acc + parseFloat(extendedTx30DaysAgo), 0)
  return { extendedTotalTx, extendedTotal30DaysAgoTx }
}

const getCoreTotalTx = async (coreProdClients: { chainId: string; client: GraphQLClient }[], days30Ago: Dayjs) => {
  const totalTxCoreQuery = gql`
    query TotalTransactions($block: Block_height) {
      plexFactories(block: $block) {
        totalTransactions
      }
    }
  `

  const coreTotalTxResults: any[] = (
    await Promise.all(
      coreProdClients.map(async ({ client }) => {
        let result
        try {
          result = await client.request<any>(totalTxCoreQuery)
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  const coreTotalTx30DaysAgoResults: any[] = (
    await Promise.all(
      coreProdClients.map(async ({ chainId, client }) => {
        let result
        try {
          const [days30AgoBlock] = await getBlocksFromTimestamps(
            [days30Ago.unix()],
            undefined,
            undefined,
            multiChainName[chainId],
          )
          if (!days30AgoBlock) {
            throw new Error('No block found for 30 days ago')
          }
          result = await client.request<any>(totalTxCoreQuery, {
            block: {
              number: days30AgoBlock.number,
            },
          })
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  const coreTotalTx = coreTotalTxResults
    .map((factories) => {
      return factories.plexFactories?.[0]
    })
    .filter(Boolean)
    .map((transactions) => {
      return transactions.totalTransactions
    })
    .reduce((acc, coreTx) => acc + parseFloat(coreTx), 0)

  const coreTotal30DaysAgoTx = coreTotalTx30DaysAgoResults
    .map((factories) => {
      return factories.plexFactories?.[0]
    })
    .filter(Boolean)
    .map((transactions) => {
      return transactions.totalTransactions
    })
    .reduce((acc, coreTx30Ago) => acc + parseFloat(coreTx30Ago), 0)
  return { coreTotalTx, coreTotal30DaysAgoTx }
}

const getStableTotalTx = async (stableProdClients: { chainId: string; client: GraphQLClient }[], days30Ago: Dayjs) => {
  const totalTxStableQuery = gql`
    query TotalTransactions($block: Block_height) {
      factories(block: $block) {
        totalTransactions
      }
    }
  `

  const stableTotalTxResults: any[] = (
    await Promise.all(
      stableProdClients.map(async ({ client }) => {
        let result
        try {
          result = await client.request<any>(totalTxStableQuery)
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  const stableTotalTx30DaysAgoResults: any[] = (
    await Promise.all(
      stableProdClients.map(async ({ chainId, client }) => {
        let result
        try {
          const [days30AgoBlock] = await getBlocksFromTimestamps(
            [days30Ago.unix()],
            undefined,
            undefined,
            multiChainName[chainId],
          )
          if (!days30AgoBlock) {
            throw new Error('No block found for 30 days ago')
          }
          result = await client.request<any>(totalTxStableQuery, {
            block: {
              number: days30AgoBlock.number,
            },
          })
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  const stableTotalTx = stableTotalTxResults
    .map((factories) => {
      return factories.factories?.[0]
    })
    .filter(Boolean)
    .map((transactions) => {
      return transactions.totalTransactions
    })
    .reduce((acc, stableTx) => acc + parseFloat(stableTx), 0)

  const stableTotal30DaysAgoTx = stableTotalTx30DaysAgoResults
    .map((factories) => {
      return factories.factories?.[0]
    })
    .filter(Boolean)
    .map((transactions) => {
      return transactions.totalTransactions
    })
    .reduce((acc, stableTx30DaysAgo) => acc + parseFloat(stableTx30DaysAgo), 0)
  return { stableTotalTx, stableTotal30DaysAgoTx }
}

const getExtendedTvl = async (extendedProdClients: GraphQLClient[]) => {
  const extendedTvlResults: any[] = (
    await Promise.all(
      extendedProdClients.map(async (client) => {
        let result
        try {
          result = await client.request<any>(gql`
            query tvl {
              factories(first: 1) {
                totalValueLockedUSD
              }
            }
          `)
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  return extendedTvlResults
    .map((factories) => {
      return factories.factories?.[0]
    })
    .filter(Boolean)
    .map((valueLocked) => {
      return valueLocked.totalValueLockedUSD
    })
    .reduce((acc, extendedTvlString) => acc + parseFloat(extendedTvlString), 0)
}

const getCoreTvl = async (coreProdClients: GraphQLClient[]) => {
  const coreTvlResults: any[] = (
    await Promise.all(
      coreProdClients.map(async (client) => {
        let result
        try {
          result = await client.request<any>(gql`
            query tvl {
              plexFactories(first: 1) {
                totalLiquidityUSD
              }
            }
          `)
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  return coreTvlResults
    .map((factories) => {
      return factories.plexFactories?.[0]
    })
    .filter(Boolean)
    .map((valueLocked) => {
      return valueLocked.totalLiquidityUSD
    })
    .reduce((acc, coreTvlString) => acc + parseFloat(coreTvlString), 0)
}

const getStableTvl = async (stableProdClients: GraphQLClient[]) => {
  const stableTvlResults: any[] = (
    await Promise.all(
      stableProdClients.map(async (client) => {
        let result
        try {
          result = await client.request<any>(gql`
            query tvl {
              factories(first: 1) {
                totalLiquidityUSD
              }
            }
          `)
        } catch (error) {
          if (process.env.NODE_ENV === 'production') {
            console.error('Error when fetching tvl stats', error)
          }
        }
        return result
      }),
    )
  ).filter(Boolean)

  return stableTvlResults
    .map((factories) => {
      return factories.factories?.[0]
    })
    .filter(Boolean)
    .map((valueLocked) => {
      return valueLocked.totalLiquidityUSD
    })
    .reduce((acc, coreTvlString) => acc + parseFloat(coreTvlString), 0)
}

const getProdClients = (urls: Partial<{ [key in ChainId]: string | null }>) => {
  return Object.entries(urls)
    .filter(([string, clientUrl]) => {
      return Boolean(!ChainId[string].toLowerCase().includes('test') && clientUrl)
    })
    .map(([string, clientUrl]) => {
      return {
        chainId: string,
        client: new GraphQLClient(clientUrl!, {
          timeout: 5000,
          headers: {
            origin: 'https://plexswap.finance',
          },
        }),
      }
    })
}