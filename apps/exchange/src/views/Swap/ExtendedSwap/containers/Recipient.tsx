import { useTranslation } from '@plexswap/localization'
import { ArrowDownIcon, Button } from '@plexswap/ui-plex'
import { memo } from 'react'

import { AutoRow } from 'components/Layout/Row'
import { useSwapState } from 'state/swap/hooks'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'

import AddressInputPanel from '../../components/AddressInputPanel'
import { ArrowWrapper } from '../../components/styleds'
import { useAllowRecipient } from '../hooks'

export const Recipient = memo(function Recipient() {
  const { t } = useTranslation()
  const { recipient } = useSwapState()
  const { onChangeRecipient } = useSwapActionHandlers()
  const allowRecipient = useAllowRecipient()

  if (!allowRecipient || recipient === null) {
    return null
  }

  return (
    <>
      <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
        <ArrowWrapper clickable={false}>
          <ArrowDownIcon width="16px" />
        </ArrowWrapper>
        <Button
          variant="text"
          id="remove-recipient-button"
          onClick={() => onChangeRecipient(null)}
          data-dd-action-name="Swap remove recipient button"
        >
          {t('- Remove send')}
        </Button>
      </AutoRow>
      <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
    </>
  )
})
