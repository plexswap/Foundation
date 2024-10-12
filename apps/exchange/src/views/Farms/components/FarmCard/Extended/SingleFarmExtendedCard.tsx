import { IPendingWayaByTokenId, PositionDetails } from '@plexswap/farms'
import { useTranslation } from '@plexswap/localization'
import { Token } from '@plexswap/sdk-core'
import {
    AtomBox,
    AtomBoxProps,
    AutoColumn,
    Button,
    Flex,
    Modal,
    ModalCore,
    RowBetween,
    StyledTooltip,
    Text,
    useModalCore,
} from '@plexswap/ui-plex'
import { formatBigInt } from '@plexswap/utils/formatBalance'
import { isPositionOutOfRange } from '@plexswap/utils/isPositionOutOfRange'
import { Pool } from '@plexswap/sdk-extended'
import { FarmWidget } from '@plexswap/widgets-internal'
import { BigNumber } from 'bignumber.js'
import { LightCard } from 'components/Card'
import { RangeTag } from 'components/RangeTag'
import { CHAIN_QUERY_NAME } from 'config/chains'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useWayaPrice } from 'hooks/useWayaPrice'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { styled, useTheme } from 'styled-components'
import { logGTMClickStakeFarmEvent } from 'utils/customGTMEventTracking'
import { ExtendedFarm } from 'views/Farms/FarmsExtended'
import useFarmExtendedActions from 'views/Farms/hooks/extended/useFarmExtendedActions'
import { WayaExtendedCardView } from '../../YieldBooster/components/Extended/CardView'
import { useBoostStatus } from '../../YieldBooster/hooks/Extended/useBoostStatus'
import {
    useSowExtendedFarmCanBoost,
    useIsBoostedPool,
    useUserBoostedPoolsTokenId,
    useUserPositionInfo,
    useVoterUserMultiplierBeforeBoosted,
} from '../../YieldBooster/hooks/Extended/useWayaExtendedInfo'
import FarmExtendedStakeAndUnStake, { FarmExtendedLPPosition, FarmExtendedLPPositionDetail, FarmExtendedLPTitle } from './FarmExtendedStakeAndUnStake'

const { FarmExtendedHarvestAction } = FarmWidget.FarmExtendedTable

export const ActionContainer = styled(Flex)`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 8px;
  flex-wrap: wrap;
  padding: 16px;
  gap: 24px;
`

const Arrow = styled.div`
  position: absolute;
  top: 0px;
  transform: translate3d(0px, 62px, 0px);
  right: 4px;
  &::before {
    content: '';
    transform: rotate(45deg);
    background: var(--colors-backgroundAlt);
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    z-index: -1;
  }
`

ActionContainer.defaultProps = {
  bg: 'dropdown',
}

type PositionType = 'staked' | 'unstaked'

interface SingleFarmExtendedCardProps {
  farm: ExtendedFarm
  pool?: Pool
  lpSymbol: string
  position: PositionDetails
  positionType: PositionType
  token: Token
  quoteToken: Token
  pendingWayaByTokenIds: IPendingWayaByTokenId
  onDismiss?: () => void
  direction?: 'row' | 'column'
  harvesting?: boolean
}

const SingleFarmExtendedCard: React.FunctionComponent<
  React.PropsWithChildren<SingleFarmExtendedCardProps & Omit<AtomBoxProps, 'position'>>
> = ({
  farm,
  pool,
  lpSymbol,
  position,
  token,
  quoteToken,
  positionType,
  pendingWayaByTokenIds,
  onDismiss,
  direction = 'column',
  harvesting,
  ...atomBoxProps
}) => {
  const { chainId } = useActiveChainId()
  const { t } = useTranslation()
  const wayaPrice = useWayaPrice()
  const { tokenId } = position
  const { isDark, colors } = useTheme()

  const title = `${lpSymbol} (#${tokenId.toString()})`
  const liquidityUrl = `/liquidity/${tokenId.toString()}?chain=${CHAIN_QUERY_NAME[chainId ?? -1] ?? ''}`

  const { updatedUserMultiplierBeforeBoosted } = useVoterUserMultiplierBeforeBoosted()
  const { mutate: updateIsBoostedPool } = useIsBoostedPool(tokenId.toString())
  const { updateUserPositionInfo } = useUserPositionInfo(tokenId.toString())
  const { updateBoostedPoolsTokenId } = useUserBoostedPoolsTokenId()
  const { updateStatus } = useBoostStatus(farm.pid, tokenId.toString())

  const onDone = useCallback(() => {
    updateIsBoostedPool()
    updateUserPositionInfo()
    updateBoostedPoolsTokenId()
    updatedUserMultiplierBeforeBoosted()
    updateStatus()
  }, [
    updateIsBoostedPool,
    updateUserPositionInfo,
    updateBoostedPoolsTokenId,
    updatedUserMultiplierBeforeBoosted,
    updateStatus,
  ])

  const { onStake, onUnstake, onHarvest, attemptingTxn } = useFarmExtendedActions({
    tokenId: tokenId.toString(),
    onDone,
  })

  const { farmCanBoost } = useSowExtendedFarmCanBoost(farm.pid)

  const unstakedModal = useModalCore()

  const handleStake = async () => {
    await onStake()
    if (!attemptingTxn) {
      onDismiss?.()
    }
    logGTMClickStakeFarmEvent()
  }

  const handleStakeInactivePosition = () => {
    unstakedModal.onOpen()
  }

  const handleUnStake = async () => {
    await onUnstake()
    if (!attemptingTxn) {
      unstakedModal.onDismiss()
    }
  }

  const handleHarvest = async () => {
    await onHarvest()
    if (!attemptingTxn) {
      onDismiss?.()
    }
  }

  const dividerBorderStyle = useMemo(() => `1px solid ${colors.input}`, [colors.input])

  const outOfRange = isPositionOutOfRange(pool?.tickCurrent, position)
  const outOfRangeUnstaked = outOfRange && positionType === 'unstaked'

  const totalEarnings = useMemo(
    () => +formatBigInt(pendingWayaByTokenIds[position.tokenId.toString()] || 0n, 4),
    [pendingWayaByTokenIds, position.tokenId],
  )

  const earningsBusd = useMemo(() => {
    return new BigNumber(totalEarnings).times(wayaPrice.toString()).toNumber()
  }, [wayaPrice, totalEarnings])

  const router = useRouter()
  const isHistory = useMemo(() => router.pathname.includes('history'), [router])

  return (
    <AtomBox {...atomBoxProps}>
      <ActionContainer bg="background" flexDirection={direction}>
        <RowBetween
          flexDirection="column"
          alignItems="flex-start"
          style={{ flexGrow: 1.25 }}
          flex={{
            xs: 'auto',
            md: 1,
          }}
        >
          <FarmExtendedStakeAndUnStake
            title={title}
            farm={farm}
            outOfRange={outOfRange}
            position={position}
            token={token}
            quoteToken={quoteToken}
            positionType={positionType}
            liquidityUrl={liquidityUrl}
            isPending={attemptingTxn || (harvesting ?? false)}
            handleStake={outOfRangeUnstaked ? handleStakeInactivePosition : handleStake}
            handleUnStake={unstakedModal.onOpen}
          />
          <ModalCore {...unstakedModal} closeOnOverlayClick>
            <Modal
              title={outOfRangeUnstaked ? t('Staking') : t('Unstaking')}
              width={['100%', '100%', '420px']}
              maxWidth={['100%', null, '420px']}
            >
              <AutoColumn gap="16px">
                <AtomBox
                  position="relative"
                  style={{
                    minHeight: '96px',
                  }}
                >
                  <AtomBox
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: '-23px',
                      display: 'flex',
                    }}
                  >
                    <StyledTooltip
                      data-theme={isDark ? 'light' : 'dark'}
                      style={{
                        maxWidth: '160px',
                        position: 'relative',
                      }}
                    >
                      {outOfRangeUnstaked ? (
                        <>
                          {t('Inactive positions will')}
                          <b> {t('NOT')} </b>
                          {t('earn WAYA rewards from farm.')}
                        </>
                      ) : (
                        t('You may add or remove liquidity on the position detail page without unstake')
                      )}
                      <Arrow />
                    </StyledTooltip>
                    <Image
                      src="/images/decorations/bulb-bunny.png"
                      width={135}
                      height={120}
                      alt="bulb bunny reminds unstaking"
                    />
                  </AtomBox>
                </AtomBox>
                <LightCard>
                  <AutoColumn gap="8px">
                    {outOfRange && (
                      <RangeTag outOfRange ml={0} style={{ alignItems: 'center', width: 'fit-content' }}>
                        {t('Inactive')}
                      </RangeTag>
                    )}
                    <FarmExtendedLPTitle title={title} liquidityUrl={liquidityUrl} outOfRange={outOfRange} />
                    <FarmExtendedLPPosition token={token} quoteToken={quoteToken} position={position} />
                    <FarmExtendedLPPositionDetail
                      token={token}
                      quoteToken={quoteToken}
                      position={position}
                      farm={farm}
                      positionType={positionType}
                    />
                    <NextLink href={liquidityUrl} onClick={unstakedModal.onDismiss}>
                      {outOfRangeUnstaked ? (
                        <Button
                          external
                          variant="primary"
                          width="100%"
                          as="a"
                          href={liquidityUrl}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {t('View Position')}
                        </Button>
                      ) : (
                        <Button variant="tertiary" width="100%" as="a">
                          {t('Manage Position')}
                        </Button>
                      )}
                    </NextLink>
                  </AutoColumn>
                </LightCard>
                <Button
                  variant={outOfRangeUnstaked ? 'subtle' : 'primary'}
                  onClick={outOfRangeUnstaked ? handleStake : handleUnStake}
                  disabled={attemptingTxn || harvesting}
                  width="100%"
                >
                  {outOfRangeUnstaked ? t('Continue Staking') : t('Unstake')}
                </Button>
                {outOfRangeUnstaked ? null : (
                  <Text color="textSubtle">
                    {t(
                      'Unstake will also automatically harvest any earnings that you haven’t collected yet, and send them to your wallet.',
                    )}
                  </Text>
                )}
              </AutoColumn>
            </Modal>
          </ModalCore>
        </RowBetween>
        {positionType !== 'unstaked' && (
          <>
            <AtomBox
              width={{
                xs: '100%',
                md: 'auto',
              }}
              style={{ borderLeft: dividerBorderStyle, borderTop: dividerBorderStyle }}
            />
            <RowBetween flexDirection="column" alignItems="flex-start" flex={1} width="100%">
              <FarmExtendedHarvestAction
                earnings={totalEarnings}
                earningsBusd={earningsBusd}
                pendingTx={attemptingTxn || (harvesting ?? false)}
                disabled={!pendingWayaByTokenIds?.[position.tokenId.toString()] ?? true}
                userDataReady
                handleHarvest={handleHarvest}
              />
            </RowBetween>
          </>
        )}
        {farmCanBoost && !isHistory && (
          <>
            <AtomBox
              width={{
                xs: '100%',
                md: 'auto',
              }}
              style={{ borderLeft: dividerBorderStyle, borderTop: dividerBorderStyle }}
            />
            <RowBetween flexDirection="column" alignItems="flex-start" flex={1} width="100%">
              <WayaExtendedCardView
                tokenId={position.tokenId.toString()}
                pid={farm.pid}
                isFarmStaking={positionType === 'staked'}
              />
            </RowBetween>
          </>
        )}
      </ActionContainer>
    </AtomBox>
  )
}

export default SingleFarmExtendedCard
