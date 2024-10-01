import { ChainId, BLOCKS_SUBGRAPHS, EXTENDED_SUBGRAPHS, STABLESWAP_SUBGRAPHS, CORE_SUBGRAPHS } from '@plexswap/chains'

import { ASSETS_PLEX } from '@plexswap/ui-plex'

export const SNAPSHOT_BASE_URL = process.env.NEXT_PUBLIC_SNAPSHOT_BASE_URL
export const SNAPSHOT_API = `${SNAPSHOT_BASE_URL}/graphql`
export const SNAPSHOT_HUB_API = `${SNAPSHOT_BASE_URL}/api/message`

export const INFO_CLIENT = 'https://api.studio.thegraph.com/query/31296/plexswap/version/latest'
export const BLOCKS_CLIENT = BLOCKS_SUBGRAPHS[ChainId.BSC]

export const BIT_QUERY = 'https://graphql.bitquery.io'
export const GRAPH_HEALTH = 'https://api.thegraph.com/index-node/graphql'

export const FARMS_API = 'https://farms-api.plexfinance.us'

// LOOKUP //
export const WALLET_API = 'https://wallet-api.pancakeswap.com'

// LOOKUP //
export const QUOTING_API_PREFIX = `${process.env.NEXT_PUBLIC_QUOTING_API}/order-price`
export const QUOTING_API = `${QUOTING_API_PREFIX}/get-price`

// LOOKUP //
// export const ONRAMP_API_BASE_URL = 'https://pcs-onramp-api.com'
export const ONRAMP_API_BASE_URL = 'https://onramp2-api.pancakeswap.com'
export const TRANSAK_API_BASE_URL = 'https://api-stg.transak.com/api/v1'
export const MOONPAY_BASE_URL = 'https://api.moonpay.com'

// LOOKUP //
export const ACCESS_RISK_API = 'https://red.alert.plexswap.com/red-api'

export const CELER_API = 'https://api.celerscan.com/scan'

export const ASSET_CDN = ASSETS_PLEX

export const MERCURYO_WIDGET_ID = process.env.NEXT_PUBLIC_MERCURYO_WIDGET_ID || '64d1f9f9-85ee-4558-8168-1dc0e7057ce6'

export const MOONPAY_API_KEY = process.env.NEXT_PUBLIC_MOONPAY_LIVE_KEY || 'pk_test_SNptAKvlXucMx0UfLYZ3M3iKC7xq9'

export const TRANSAK_API_KEY = process.env.NEXT_PUBLIC_TRANSAK_LIVE_KEY || 'bf960e79-6d98-4fd0-823d-8409d290c346'

export const MERCURYO_WIDGET_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://sandbox-widget.mrcr.io/embed.2.0.js'
    : 'https://widget.mercuryo.io/embed.2.0.js'

export const INFO_CLIENT_WITH_CHAIN = {
      [ChainId.BSC]: 'https://proxy-api.plexfinance.us/bsc-exchange',
}
    
export const CORE_SUBGRAPH_URLS = {
  ...CORE_SUBGRAPHS,
}

export const EXTENDED_SUBGRAPH_URLS = {
  ...EXTENDED_SUBGRAPHS,
}

export const STABLESWAP_SUBGRAPHS_URLS = {
  ...STABLESWAP_SUBGRAPHS,
}

export const BLOCKS_CLIENT_WITH_CHAIN = BLOCKS_SUBGRAPHS