import { HistoryIcon, IconButton, useModal } from '@plexswap/ui-plex'
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <IconButton scale="sm" variant="text" onClick={onPresentTransactionsModal}>
        <HistoryIcon color="textSubtle" width="24px" />
      </IconButton>
    </>
  )
}

export default Transactions
