import { PoolWidget as Pool } from '@plexswap/widgets-internal'
import {
    Balance,
    Button,
    CalculateIcon,
    Flex,
    FlexGap,
    Skeleton,
    Text,
    TooltipText,
    useMatchBreakpoints,
    useModal,
    useTooltip
} from '@plexswap/ui-plex'

import { useTranslation } from '@plexswap/localization'
import { MAX_LOCK_DURATION, DeserializedLockedVaultUser, VaultKey } from '@plexswap/pools'
import { Token } from '@plexswap/sdk-core'
import { useVaultApy } from 'hooks/useVaultApy'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { styled } from 'styled-components'
import { VaultPosition, getVaultPosition, isLocked } from 'utils/wayaPool'

import LockedAprTooltipContent from '../../LockedPool/Common/LockedAprTooltipContent'
import { VaultRoiCalculatorModal } from '../../Vault/VaultRoiCalculatorModal'

const AprLabelContainer = styled(Flex)`
  &:hover {
    opacity: 0.5;
  }
`

interface AprCellProps {
  pool: Pool.DeserializedPool<Token>
}

const AutoAprCell: React.FC<React.PropsWithChildren<AprCellProps>> = ({ pool }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const { userData } = useVaultPoolByKey(pool.vaultKey as Pool.VaultKey)

  const vaultPosition = getVaultPosition(userData)
  const isLock = userData ? isLocked(userData) : false

  const { flexibleApy, lockedApy } = useVaultApy({
    duration:
      vaultPosition > VaultPosition.Flexible
        ? +(userData as DeserializedLockedVaultUser).lockEndTime -
          +(userData as DeserializedLockedVaultUser).lockStartTime
        : MAX_LOCK_DURATION,
  })

  const [onPresentFlexibleApyModal] = useModal(<VaultRoiCalculatorModal pool={pool} />)
  const [onPresentLockedApyModal] = useModal(
    <VaultRoiCalculatorModal pool={pool} initialView={1} />,
    true,
    true,
    pool.vaultKey === VaultKey.WayaVault ? 'LockedVaultRoiCalculatorModal' : 'FlexibleVaultRoiCalculatorModal',
  )

  const tooltipContent = <LockedAprTooltipContent />
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  if (pool.vaultKey === VaultKey.WayaVault && vaultPosition === VaultPosition.None) {
    return (
      <>
        <Pool.BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 100px', '2 0 100px', '1 0 120px']}>
          <Pool.CellContent>
            <Text fontSize="12px" color="textSubtle" textAlign="left">
              {t('Flexible APY')}
            </Text>
            {flexibleApy ? (
              <AprLabelContainer alignItems="center" justifyContent="flex-start">
                <Balance
                  fontSize={['14px', '14px', '16px']}
                  value={parseFloat(flexibleApy)}
                  decimals={2}
                  unit="%"
                  fontWeight={[600, 400]}
                />
                {!isMobile && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onPresentFlexibleApyModal()
                    }}
                    variant="text"
                    width="20px"
                    height="20px"
                    padding="0px"
                    marginLeft="4px"
                  >
                    <CalculateIcon color="textSubtle" width="20px" />
                  </Button>
                )}
              </AprLabelContainer>
            ) : (
              <Skeleton width="80px" height="16px" />
            )}
          </Pool.CellContent>
        </Pool.BaseCell>
        <Pool.BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 150px', '2 0 150px', '1 0 190px']}>
          <Pool.CellContent>
            <Text fontSize="12px" color="textSubtle" textAlign="left">
              {t('Locked APR')}
            </Text>
            {lockedApy ? (
              <AprLabelContainer alignItems="center" justifyContent="flex-start">
                <FlexGap gap="4px" flexWrap="wrap">
                  <Text fontSize={['14px', '14px', '16px']} style={{ whiteSpace: 'nowrap' }} fontWeight={[500, 400]}>
                    {t('Up to')}
                  </Text>
                  <Balance
                    fontSize={['14px', '14px', '16px']}
                    value={parseFloat(lockedApy)}
                    decimals={2}
                    unit="%"
                    fontWeight={[600, 400]}
                  />
                  {!isMobile && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        onPresentLockedApyModal()
                      }}
                      variant="text"
                      width="20px"
                      height="20px"
                      padding="0px"
                      marginLeft="4px"
                    >
                      <CalculateIcon color="textSubtle" width="20px" />
                    </Button>
                  )}
                </FlexGap>
              </AprLabelContainer>
            ) : (
              <Skeleton width="80px" height="16px" />
            )}
          </Pool.CellContent>
        </Pool.BaseCell>
      </>
    )
  }

  return (
    <Pool.BaseCell role="cell" flex={['1 0 50px', '1 0 50px', '2 0 150px', '2 0 150px', '1 0 190px']}>
      <Pool.CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {isLock ? t('APR') : t('APY')}
        </Text>
        {flexibleApy ? (
          <AprLabelContainer alignItems="center" justifyContent="flex-start">
            {vaultPosition >= VaultPosition.Flexible ? (
              <>
                {tooltipVisible && tooltip}
                <TooltipText
                  ref={targetRef}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Balance
                    fontSize="16px"
                    value={
                      vaultPosition > VaultPosition.Flexible ? parseFloat(lockedApy ?? '0') : parseFloat(flexibleApy)
                    }
                    decimals={2}
                    unit="%"
                  />
                </TooltipText>
              </>
            ) : (
              <Balance
                fontSize="16px"
                value={vaultPosition > VaultPosition.Flexible ? parseFloat(lockedApy) : parseFloat(flexibleApy)}
                decimals={2}
                unit="%"
              />
            )}
            <Button
              onClick={(e) => {
                e.stopPropagation()
                return vaultPosition > VaultPosition.Flexible ? onPresentLockedApyModal() : onPresentFlexibleApyModal()
              }}
              variant="text"
              width="20px"
              height="20px"
              padding="0px"
              marginLeft="4px"
            >
              <CalculateIcon color="textSubtle" width="20px" />
            </Button>
          </AprLabelContainer>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </Pool.CellContent>
    </Pool.BaseCell>
  )
}

export default AutoAprCell
