import { Pool, PoolType } from '../../Ananke/types'

export function groupPoolsByType(pools: Pool[]): Pool[][] {
  const poolsByType = new Map<PoolType, Pool[]>()
  for (const pool of pools) {
    poolsByType.set(pool.type, [...(poolsByType.get(pool.type) || []), pool])
  }
  return Array.from(poolsByType.values())
}
