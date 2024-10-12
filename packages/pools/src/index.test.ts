import { expect, test } from 'vitest'
import * as exports from './index'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "POOLS_CONFIG_BY_CHAIN",
      "LIVE_POOLS_CONFIG_BY_CHAIN",
      "getPoolsConfig",
      "getLivePoolsConfig",
      "MAX_LOCK_DURATION",
      "UNLOCK_FREE_DURATION",
      "ONE_WEEK_DEFAULT",
      "BOOST_WEIGHT",
      "DURATION_FACTOR",
      "BOOSTED_POOLS_CONFIG_BY_CHAIN",
      "getBoostedPoolsConfig",
      "getBoostedPoolConfig",
      "IWAYA",
      "WAYA_VAULT",
      "WAYA_FLEXIBLE_VAULT",
      "SUPPORTED_CHAIN_IDS",
      "WAYA_VAULT_SUPPORTED_CHAINS",
      "BSC_BLOCK_TIME",
      "BLOCKS_PER_DAY",
      "BLOCKS_PER_YEAR",
      "SECONDS_IN_YEAR",
      "PoolCategory",
      "VaultKey",
      "fetchPoolsTimeLimits",
      "fetchPoolsTotalStaking",
      "fetchPoolsStakingLimitsByBlock",
      "fetchPoolsStakingLimits",
      "fetchPoolsProfileRequirement",
      "fetchPoolsAllowance",
      "fetchUserBalances",
      "fetchUserStakeBalances",
      "fetchUserPendingRewards",
      "fetchPublicVaultData",
      "fetchPublicFlexibleVaultData",
      "fetchVaultFees",
      "getWayaVaultAddress",
      "getWayaVaultAddress",
      "fetchVaultUser",
      "fetchFlexibleVaultUser",
      "getContractAddress",
      "isPoolsSupported",
      "isWayaVaultSupported",
      "isLegacyPool",
      "isUpgradedPool",
      "getPoolAprByTokenPerBlock",
      "getPoolAprByTokenPerSecond",
      "getSousChefBNBContract",
      "getSousChefCoreContract",
      "getSmartChefChefCoreContract",
      "getPoolContractByPoolId",
      "checkIsBoostedPool",
      "getBoostedPoolApr",
      "wayaFlexibleVaultABI",
      "wayaVaultABI",
      "smartChefABI",
      "cropChiefABI",
      "cropChiefBnbABI",
      "cropChiefABI",
      "cropChiefV3ABI",
    ]
  `)
})
