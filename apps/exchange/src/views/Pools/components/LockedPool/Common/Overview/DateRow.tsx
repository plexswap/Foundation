import { useTranslation } from '@plexswap/localization'
import { Flex, Text, TooltipText, useTooltip } from '@plexswap/ui-plex'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

interface PropsType {
  title: React.ReactNode
  value?: Date
  color: string
}

const DateRow: React.FC<React.PropsWithChildren<PropsType>> = ({ title, value, color }) => {
  const { t } = useTranslation()
  const tooltipContent = t(
    'You will be able to withdraw the staked WAYA and profit only when the staking position is unlocked, i.e. when the staking period ends.',
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText>
        <Text ref={targetRef} color="textSubtle" textTransform="uppercase" bold fontSize="12px">
          {title}
        </Text>
      </TooltipText>
      <Text bold color={color}>
        {value ? dayjs(value).format('MMM Do, YYYY HH:mm') : '-'}
      </Text>
    </Flex>
  )
}

export default DateRow
