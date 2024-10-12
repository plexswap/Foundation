// middleware.ts
import { withABTesting } from 'middlewares/ab-test-middleware'
import { withClientId } from 'middlewares/client-id-middleware'
import { withGeoBlock } from 'middlewares/geo-block-middleware'
import { withUserIp } from 'middlewares/ip-address-middleware'
import { stackMiddlewares } from 'middlewares/stack-middleware'

export const middleware = stackMiddlewares([withClientId, withGeoBlock, withUserIp, withABTesting])

export const config = {
  matcher: [
    '/',
    '/swap',
    '/liquidity',
    '/pools',
    '/farms',
    '/add',
    '/remove',
    '/find',
    '/limit-orders',
    '/info/:path*',
  ],
}