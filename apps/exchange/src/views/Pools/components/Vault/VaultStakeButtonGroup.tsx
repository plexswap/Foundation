import { useTranslation } from '@plexswap/localization'
import { Box, Button, FlexGap, TooltipText, useTooltip } from '@plexswap/ui-plex'

export const VaultStakeButtonGroup = ({
  onFlexibleClick,
  onLockedClick,
}: {
  onFlexibleClick: () => void
  onLockedClick?: () => void
}) => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Box>
      {t(
        'Flexible staking offers flexibility for staking/unstaking whenever you want. Locked staking offers higher APY as well as other benefits.',
      )}
    </Box>,
    { placement: 'bottom-start' },
  )
  return (
    <Box width="100%">
      <FlexGap gap="12px">
        <Button style={{ flex: 1 }} onClick={onFlexibleClick}>
          {t('Flexible')}
        </Button>
        {onLockedClick && (
          <Button style={{ flex: 1 }} onClick={onLockedClick}>
            {t('Locked')}
          </Button>
        )}
      </FlexGap>
      {tooltipVisible && tooltip}
      {onLockedClick && (
        <TooltipText mt="16px" small ref={targetRef}>
          {t('What’s the difference?')}
        </TooltipText>
      )}
    </Box>
  )
}
