export const farmBoosterProxyABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "DepositByProxy",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      }
    ],
    name: "EmergencyWithdrawByProxy",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxy",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "WithdrawByProxy",
    type: "event"
  },
  {
    inputs: [],
    name: "ChiefFarmer",
    outputs: [
      {
        internalType: "contract IChiefFarmer",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "FARM_BOOSTER_PROXY_FACTORY",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "Waya",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256"
      }
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "farmBooster",
    outputs: [
      {
        internalType: "contract IFarmBooster",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address"
      },
      {
        internalType: "address",
        name: "_farmBooster",
        type: "address"
      },
      {
        internalType: "address",
        name: "_ChiefFarmer",
        type: "address"
      },
      {
        internalType: "address",
        name: "_Waya",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "lpApproved",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
] as const
