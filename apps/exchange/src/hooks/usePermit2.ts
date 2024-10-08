import { getPermit2Address } from "@plexswap/hub-center/Licentia"
import { Currency, CurrencyAmount, Token } from '@plexswap/sdk-core'
import { Permit2Signature } from "@plexswap/gateway-guardians/Evolus"
import { QueryObserverResult } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { Address } from 'viem'
import useAccountActiveChain from './useAccountActiveChain'
import { useApproveCallback } from './useApproveCallback'
import { Permit2Details, usePermit2Details } from './usePermit2Details'
import { usePermit2Requires } from './usePermit2Requires'
import { useWritePermit } from './useWritePermit'

type Permit2HookState = {
  permit2Allowance: CurrencyAmount<Currency> | undefined
  permit2Details: Permit2Details | undefined

  isPermitting: boolean
  isApproving: boolean
  isRevoking: boolean

  requirePermit: boolean
  requireApprove: boolean
  requireRevoke: boolean
}

type Permit2HookCallback = {
  permit: () => Promise<Permit2Signature>
  approve: () => Promise<{ hash: Address } | undefined>
  revoke: () => Promise<{ hash: Address } | undefined>

  refetch: () => Promise<QueryObserverResult<bigint>>
}

type UsePermit2ReturnType = Permit2HookState & Permit2HookCallback

export const usePermit2 = (
  amount: CurrencyAmount<Token> | undefined,
  spender: Address | undefined,
): UsePermit2ReturnType => {
  const { account, chainId } = useAccountActiveChain()
  const approveTarget = useMemo(() => getPermit2Address(chainId), [chainId])

  const { data: permit2Details } = usePermit2Details(account, amount?.currency, spender)
  const {
    requireApprove,
    requirePermit,
    requireRevoke,
    refetch,
    allowance: permit2Allowance,
  } = usePermit2Requires(amount, spender)

  const [isPermitting, setIsPermitting] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  const writePermit = useWritePermit(amount?.currency, spender, permit2Details?.nonce)
  const { approveNoCheck, revokeNoCheck } = useApproveCallback(amount, approveTarget)

  const permit = useCallback(async () => {
    setIsPermitting(true)

    const signature = await writePermit()

    setIsPermitting(false)

    return signature
  }, [writePermit])

  const approve = useCallback(async () => {
    setIsApproving(true)
    try {
      const result = await approveNoCheck()
      return result
    } finally {
      setIsApproving(false)
    }
  }, [approveNoCheck])

  const revoke = useCallback(async () => {
    setIsRevoking(true)
    try {
      const result = await revokeNoCheck()
      return result
    } finally {
      setIsRevoking(false)
    }
  }, [revokeNoCheck])

  return {
    permit2Allowance,
    permit2Details,

    isPermitting,
    isApproving,
    isRevoking,

    requireApprove,
    requirePermit,
    requireRevoke,

    refetch,

    approve,
    revoke,
    permit,
  }
}
