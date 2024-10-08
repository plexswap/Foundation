import { useTranslation } from '@plexswap/localization';
import { Flex, FlexProps, Link, LinkProps, Text } from '@plexswap/ui-plex';

export const ChartByLabel = ({
  symbol,
  link,
  by,
  linkProps,
  ...props
}: { symbol: string; link: string; by: string; linkProps?: LinkProps } & FlexProps) => {
  const { t } = useTranslation()
  return (
    <Flex alignItems="center" px="24px" {...props}>
      <Text fontSize="14px" mr="4px">
        {symbol} {t('Chart')} {t('by')}
      </Text>
      <Link fontSize="14px" href={link} external {...linkProps}>
        {by}
      </Link>
    </Flex>
  )
}
