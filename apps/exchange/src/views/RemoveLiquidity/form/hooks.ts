import useLocalDispatch from 'contexts/LocalRedux/useLocalDispatch'
import { useCallback } from 'react'
import { selectPercent } from './actions'

export function useBurnExtendedActionHandlers(): {
  onPercentSelect: (percent: number) => void
} {
  const dispatch = useLocalDispatch()

  const onPercentSelect = useCallback(
    (percent: number) => {
      dispatch(selectPercent({ percent }))
    },
    [dispatch],
  )

  return {
    onPercentSelect,
  }
}
