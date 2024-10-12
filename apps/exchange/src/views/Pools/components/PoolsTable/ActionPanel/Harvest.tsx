import { PoolWidget as Pool } from '@plexswap/widgets-internal'
import { Balance, Button, Flex, Heading, Skeleton, Text, useModal } from '@plexswap/ui-plex'
import { useTranslation } from '@plexswap/localization'
import { Token } from '@plexswap/sdk-core'
import { BIG_ZERO } from '@plexswap/utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from '@plexswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { PoolCategory } from '@plexswap/pools'
import { useAccount } from 'wagmi'
import CollectModal from '../../Modals/CollectModal'
import { ActionContainer, ActionContent, ActionTitles } from './styles'

const HarvestAction: React.FunctionComponent<React.PropsWithChildren<Pool.DeserializedPool<Token>>> = ({
  poolId,
  poolCategory,
  earningToken,
  userData,
  userDataLoaded,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  const earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  const earningTokenDollarBalance = getBalanceNumber(
    earnings.multipliedBy(earningTokenPrice || 0),
    earningToken.decimals,
  )
  const hasEarnings = earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningTokenSymbol={earningToken.symbol}
      earningsDollarValue={earningTokenDollarBalance}
      poolId={poolId}
      isBnbPool={isBnbPool}
    />,
  )

  const actionTitle = (
    <>
      <Text fontSize="12px" bold color="secondary" as="span">
        {earningToken.symbol}{' '}
      </Text>
      <Text fontSize="12px" bold color="textSubtle" as="span" textTransform="uppercase">
        {t('Earned')}
      </Text>
    </>
  )

  if (!account) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Heading>0</Heading>
          <Button disabled>{t('Harvest')}</Button>
        </ActionContent>
      </ActionContainer>
    )
  }

  if (!userDataLoaded) {
    return (
      <ActionContainer>
        <ActionTitles>{actionTitle}</ActionTitles>
        <ActionContent>
          <Skeleton width={180} height="32px" marginTop={14} />
        </ActionContent>
      </ActionContainer>
    )
  }

  return (
    <ActionContainer>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" flexDirection="column" alignSelf="flex-center">
          <>
            {hasEarnings ? (
              <>
                <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice !== undefined && earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
        <Button disabled={!hasEarnings} onClick={onPresentCollect}>
          {t('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
