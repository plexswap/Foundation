import { useTranslation } from '@plexswap/localization'
import { Button, ButtonProps, useToast } from '@plexswap/ui-plex'
import { memo, useCallback } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { ToastDescriptionWithTx } from 'components/Toast'
import { vaultPoolConfig } from 'config/constants/pools'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useVaultPoolContract } from 'hooks/useContract'
import { useAppDispatch } from 'state'
import { fetchWayaVaultUserData } from 'state/pools'
import { VaultKey } from '@plexswap/pools'
import { useAccount } from 'wagmi'

const ConvertToFlexibleButton: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveChainId()

  const { address: account } = useAccount()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const vaultPoolContract = useVaultPoolContract(VaultKey.WayaVault)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { toastSuccess } = useToast()

  const handleUnlock = useCallback(async () => {
    if (!account || !chainId) return
    const callOptions = {
      gas: vaultPoolConfig[VaultKey.WayaVault].gasLimit,
    }

    const receipt = await fetchWithCatchTxError(() => {
      const methodArgs = [account] as const
      return callWithGasPrice(vaultPoolContract, 'unlock', methodArgs, callOptions)
    })

    if (receipt?.status) {
      toastSuccess(
        t('Staked!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your funds have been staked in the pool')}
        </ToastDescriptionWithTx>,
      )
      dispatch(fetchWayaVaultUserData({ account, chainId }))
      queryClient.invalidateQueries({
        queryKey: ['userWayaLockStatus', account],
      })
    }
  }, [
    t,
    toastSuccess,
    account,
    callWithGasPrice,
    dispatch,
    fetchWithCatchTxError,
    vaultPoolContract,
    queryClient,
    chainId,
  ])

  return (
    <Button width="100%" disabled={pendingTx} onClick={handleUnlock} variant="secondary" {...props}>
      {pendingTx ? t('Converting...') : t('Convert to Flexible')}
    </Button>
  )
}

export default memo(ConvertToFlexibleButton)
