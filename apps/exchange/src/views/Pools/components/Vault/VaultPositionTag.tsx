import { useTranslation } from '@plexswap/localization'
import {
    Box,
    FlexGap,
    FlexGapProps,
    HotIcon,
    LockIcon,
    SplitIcon,
    Tag,
    TagProps,
    Text,
    UnlockIcon,
} from '@plexswap/ui-plex'
import Trans from 'components/Trans'
import { ReactNode, useMemo } from 'react'
import { DeserializedLockedVaultUser } from '@plexswap/pools'
import { VaultPosition, getVaultPosition } from 'utils/wayaPool'

const tagConfig: Record<VaultPosition, TagProps> = {
  [VaultPosition.None]: {},
  [VaultPosition.Flexible]: {
    variant: 'success',
  },
  [VaultPosition.Locked]: {
    variant: 'secondary',
  },
  [VaultPosition.LockedEnd]: {
    variant: 'secondary',
    outline: true,
  },
  [VaultPosition.AfterBurning]: {
    variant: 'failure',
    outline: true,
  },
}
const iconConfig: Record<VaultPosition, any> = {
  [VaultPosition.None]: null,
  [VaultPosition.Flexible]: SplitIcon,
  [VaultPosition.Locked]: LockIcon,
  [VaultPosition.LockedEnd]: UnlockIcon,
  [VaultPosition.AfterBurning]: HotIcon,
}

const iconColorConfig: Record<VaultPosition, any> = {
  [VaultPosition.None]: null,
  [VaultPosition.Flexible]: 'white',
  [VaultPosition.Locked]: 'white',
  [VaultPosition.LockedEnd]: 'secondary',
  [VaultPosition.AfterBurning]: 'failure',
}

const positionLabel: Record<VaultPosition, ReactNode> = {
  [VaultPosition.None]: '',
  [VaultPosition.Flexible]: <Trans>Flexible</Trans>,
  [VaultPosition.Locked]: <Trans>Locked</Trans>,
  [VaultPosition.LockedEnd]: <Trans>Locked End</Trans>,
  [VaultPosition.AfterBurning]: <Trans>After Burning</Trans>,
}

const VaultPositionTag: React.FC<React.PropsWithChildren<{ position: VaultPosition }>> = ({ position }) => {
  return (
    <Tag {...tagConfig[position]}>
      <Box as={iconConfig[position]} mr="4px" color={iconColorConfig[position]} />
      {positionLabel[position]}
    </Tag>
  )
}

export const VaultPositionTagWithLabel: React.FC<
  React.PropsWithChildren<{ userData?: DeserializedLockedVaultUser } & FlexGapProps>
> = ({ userData, ...props }) => {
  const { t } = useTranslation()

  const position = useMemo(() => getVaultPosition(userData), [userData])

  if (position) {
    return (
      <FlexGap alignItems="center" justifyContent="space-between" marginX="8px" mb="8px" gap="12px" {...props}>
        <Text fontSize="12px" color="secondary" textTransform="uppercase" bold>
          {t('My Position')}
        </Text>
        <VaultPositionTag position={position} />
      </FlexGap>
    )
  }

  return null
}
