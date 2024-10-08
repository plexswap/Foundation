import { type Address } from 'viem'
import { MaxAllowanceExpiration, 
         MaxAllowanceTransferAmount, 
         PermitSingle } from '@plexswap/hub-center/Licentia'


const TEST_DEADLINE = MaxAllowanceExpiration

export const makePermit = (
  token: Address,
  // as spender
  routerAddress: Address,
  amount: string = MaxAllowanceTransferAmount.toString(),
  nonce = 0,
): PermitSingle => {
  return {
    details: {
      token,
      amount,
      expiration: TEST_DEADLINE,
      nonce,
    },
    spender: routerAddress,
    sigDeadline: TEST_DEADLINE,
  }
}
