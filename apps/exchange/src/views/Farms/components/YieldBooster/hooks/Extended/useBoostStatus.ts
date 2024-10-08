import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useSowExtendedFarmCanBoost, useUserPositionInfo } from './useWayaExtendedInfo'

export enum BoostStatus {
  UpTo,
  farmCanBoostButNot,
  Boosted,
  CanNotBoost,
}

export const useBoostStatus = (pid: number, tokenId?: string) => {
  const { address: account } = useAccount()
  const {
    data: { boostMultiplier },
    updateUserPositionInfo,
  } = useUserPositionInfo(tokenId)
  const { farmCanBoost } = useSowExtendedFarmCanBoost(pid)
  const status = useMemo(() => {
    if (!account && !farmCanBoost) return BoostStatus.CanNotBoost
    if (!account && farmCanBoost) return BoostStatus.UpTo
    if (farmCanBoost) return boostMultiplier > 1 ? BoostStatus.Boosted : BoostStatus.farmCanBoostButNot
    return BoostStatus.CanNotBoost
  }, [account, farmCanBoost, boostMultiplier])

  return {
    status,
    updateStatus: () => {
      updateUserPositionInfo()
    },
  }
}

export const useBoostStatusPM = (
  havoterWrapper?: boolean,
  boostMultiplier?: number,
  updateStatusCallback?: () => void,
) => {
  const { address: account } = useAccount()
  const farmCanBoost = havoterWrapper
  const status = useMemo(() => {
    if (!account && !farmCanBoost) return BoostStatus.CanNotBoost
    if (!account && farmCanBoost) return BoostStatus.UpTo
    if (farmCanBoost) return (boostMultiplier ?? 0) > 1 ? BoostStatus.Boosted : BoostStatus.farmCanBoostButNot
    return BoostStatus.CanNotBoost
  }, [account, farmCanBoost, boostMultiplier])

  return {
    status,
    updateStatus: () => {
      updateStatusCallback?.()
    },
  }
}
