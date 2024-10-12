/* eslint-disable @typescript-eslint/no-unused-vars */
import { SmartRouterTrade } from '@plexswap/gateway-guardians/Ananke'
import { Percent, TradeType } from '@plexswap/sdk-core'
import { FeeOptions } from '@plexswap/sdk-extended'
import {
  Permit2Signature,
  EvolusRouter,
  getEvolusRouterAddress,
} from "@plexswap/gateway-guardians/Evolus"
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useGetENSAddressByName } from 'hooks/useGetENSAddressByName'
import { useMemo } from 'react'
import { safeGetAddress } from 'utils'
import { Address, Hex } from 'viem'

interface SwapCall {
  address: Address
  calldata: Hex
  value: Hex
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param deadline the deadline for executing the trade
 * @param feeOptions the fee options to be applied to the trade.
 */
export function useSwapCallArguments(
  trade: SmartRouterTrade<TradeType> | undefined | null,
  allowedSlippage: Percent,
  recipientAddressOrName: string | null | undefined,
  permitSignature: Permit2Signature | undefined,
  deadline: bigint | undefined,
  feeOptions: FeeOptions | undefined,
): SwapCall[] {
  const { account, chainId } = useAccountActiveChain()
  const recipientENSAddress = useGetENSAddressByName(recipientAddressOrName ?? undefined)
  const recipient = (
    recipientAddressOrName === null || recipientAddressOrName === undefined
      ? account
      : safeGetAddress(recipientAddressOrName)
      ? recipientAddressOrName
      : safeGetAddress(recipientENSAddress)
      ? recipientENSAddress
      : null
  ) as Address | null

  return useMemo(() => {
    if (!trade || !recipient || !account || !chainId) return []

    const methodParameters = EvolusRouter.swapERC20CallParameters(trade, {
      fee: feeOptions,
      recipient,
      inputTokenPermit: permitSignature,
      slippageTolerance: allowedSlippage,
      deadlineOrPreviousBlockhash: deadline?.toString(),
    })
    const swapRouterAddress = getEvolusRouterAddress(chainId)
    if (!swapRouterAddress) return []
    return [
      {
        address: swapRouterAddress,
        calldata: methodParameters.calldata as `0x${string}`,
        value: methodParameters.value as `0x${string}`,
      },
    ]
  }, [account, allowedSlippage,
      chainId, deadline, 
      feeOptions, recipient,
      permitSignature, 
      trade])
}