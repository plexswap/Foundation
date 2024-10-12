import { expect, test } from 'vitest'
import * as exports from './index'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "CoreRouter",
      "BasisRoute",
      "BasisTrade",
      "BasisRouteType",
    ]
  `)
})
