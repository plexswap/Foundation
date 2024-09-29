import { expect, test } from 'vitest'
import * as exports from './index'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "ChainId",
      "testnetChainIds",
      "chainNames",
      "chainNameToChainId",
      "getChainName",
      "getChainIdByChainName",
      "V2_SUBGRAPHS",
    ]
  `)
})
