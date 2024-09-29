import { SmartRouter } from '@plexswap/gateway-guardians'
import dayjs from 'dayjs'

import { extendedSubgraphProvider } from './provider'
import { SUPPORTED_CHAINS } from './constants'
import { getPoolsObjectName, getPoolsTvlObjectName, getPoolsTvlObjectNameByDate } from './pools'

async function handleScheduled(event: ScheduledEvent) {
  switch (event.cron) {
    case '0 */1 * * *':
      logRejectedActions(
        await Promise.allSettled(
          SUPPORTED_CHAINS.map(async (chainId) => {
            const pools = await SmartRouter.getAllExtendedPoolsFromSubgraph({ chainId, provider: extendedSubgraphProvider })
            const serializedPools = pools.map((p) => ({
              ...SmartRouter.Transformer.serializePool(p),
              tvlUSD: p.tvlUSD.toString(),
            }))
            const poolsTvl = pools.map((p) => ({
              address: p.address,
              tvlUSD: p.tvlUSD.toString(),
            }))
            await Promise.all([
              SUBGRAPH_POOLS.put(getPoolsObjectName(chainId), JSON.stringify(serializedPools), {
                httpMetadata: {
                  contentType: 'application/json',
                },
              }),
              SUBGRAPH_POOLS.put(getPoolsTvlObjectName(chainId), JSON.stringify(poolsTvl), {
                httpMetadata: {
                  contentType: 'application/json',
                },
              }),
            ])
          }),
        ),
      )
      break

      case '0 0 * * *':  {
      logRejectedActions(
        await Promise.allSettled(
          SUPPORTED_CHAINS.map(async (chainId) => {
            const save = async () => {
              const pools = await SmartRouter.getAllExtendedPoolsFromSubgraph({ chainId, provider: extendedSubgraphProvider })
              const poolsTvl = pools.map((p) => ({
                address: p.address,
                tvlUSD: p.tvlUSD.toString(),
              }))
              await SUBGRAPH_POOLS.put(
                getPoolsTvlObjectNameByDate(chainId, event.scheduledTime),
                JSON.stringify(poolsTvl),
                {
                  httpMetadata: {
                    contentType: 'application/json',
                  },
                },
              )
            }
            const cleanup = () =>
              SUBGRAPH_POOLS.delete(
                getPoolsTvlObjectNameByDate(chainId, dayjs(event.scheduledTime).subtract(11, 'days').toDate()),
              )
            logRejectedActions(await Promise.allSettled([save(), cleanup()]))
          }),
        ),
      )
      break
    }
    default:
      break
  }
}

function logRejectedActions(results: PromiseSettledResult<any>[]) {
  for (const result of results) {
    if (result.status === 'rejected') {
      console.error(result.reason)
    }
  }
}

export function setupPoolBackupCrontab() {
  addEventListener('scheduled', (event) => {
    event.waitUntil(handleScheduled(event))
  })
}
