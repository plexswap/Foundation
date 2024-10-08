export const mmLinkedPoolABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'weth',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'mm',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'treasury',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'active',
        type: 'bool',
      },
    ],
    name: 'CreateMMInfo',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'mm',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'IncrementNonce',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'mm',
        type: 'address',
      },
    ],
    name: 'RemoveMMInfo',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'mm',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'mmTreasury',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'baseToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'quoteToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'quoteTokenAmount',
        type: 'uint256',
      },
    ],
    name: 'Swap',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'mm',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'treasury',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'active',
        type: 'bool',
      },
    ],
    name: 'UpdateMMInfo',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_mm',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_treasury',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: '_active',
        type: 'bool',
      },
    ],
    name: 'createMMInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_mm',
        type: 'address',
      },
    ],
    name: 'getMMInfo',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_mm',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getUserNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'incrementNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'redeemToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_mm',
        type: 'address',
      },
    ],
    name: 'removeMMInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_mmSigner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'baseToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'quoteToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'baseTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quoteTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiryTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct PlexswapMMPool.Quote',
        name: '_quote',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_treasury',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: '_active',
        type: 'bool',
      },
    ],
    name: 'updateMMInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'user',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'baseToken',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'quoteToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'baseTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'quoteTokenAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'expiryTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct PlexswapMMPool.Quote',
        name: '_quote',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes',
      },
    ],
    name: 'verifyQuoteSignature',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const
