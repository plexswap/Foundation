import { Token } from '@plexswap/sdk-core'
import { useModal } from '@plexswap/ui-plex'
import BigNumber from 'bignumber.js'
import Cookie from 'js-cookie'
import { useEffect, useState } from 'react'
import MultiChainHarvestModal from '../components/MultiChainHarvestModal'

const useMultiChainHarvestModal = () => {
  const [harvestModalParams, setHarvestModalParams] = useState<{
    pid: number
    token: Token
    quoteToken: Token
    lpSymbol: string
    earningsBigNumber: BigNumber
    earningsBusd: number
  }>()

  const [onPresentSpecialHarvestModal] = useModal(
    harvestModalParams ? (
      <MultiChainHarvestModal
        pid={harvestModalParams.pid}
        token={harvestModalParams.token}
        lpSymbol={harvestModalParams.lpSymbol}
        quoteToken={harvestModalParams.quoteToken}
        earningsBigNumber={new BigNumber(harvestModalParams.earningsBigNumber)}
        earningsBusd={harvestModalParams.earningsBusd}
      />
    ) : null,
  )

  useEffect(() => {
    if (harvestModalParams) {
      onPresentSpecialHarvestModal()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [harvestModalParams])

  useEffect(() => {
    const harvestModalCookie = Cookie.get('multiChainHarvestModal')
    if (harvestModalCookie) {
      setHarvestModalParams(JSON.parse(harvestModalCookie))
      Cookie.remove('multiChainHarvestModal')
    }
  }, [])
}

export default useMultiChainHarvestModal
