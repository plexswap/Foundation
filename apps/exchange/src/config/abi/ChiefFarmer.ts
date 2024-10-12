export const chiefFarmerABI = [
  {
    inputs: [
      {
       internalType: "contract WayaToken",
        name: "_wayaAddress",
        type: "address"
      },
      {
       internalType: "uint256",
        name: "_emissionPerBlock",
        type: "uint256"
      },
      {
       internalType: "address",
        name: "_financialController",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
       internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
        indexed: true,
       internalType: "contract IERC20",
        name: "lpToken",
        type: "address"
      },
      {
        indexed: false,
       internalType: "bool",
        name: "isRegular",
        type: "bool"
      }
    ],
    name: "AddPool",
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
    name: "Deposit",
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
    name: "EmergencyWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
       internalType: "uint256",
        name: "oldEmissionPerBlock",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "newEmissionPerBlock",
        type: "uint256"
      }
    ],
    name: "EmissionPerBlockUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
       internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
       internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
       internalType: "address",
        name: "boostContract",
        type: "address"
      }
    ],
    name: "UpdateBoostContract",
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
        indexed: false,
       internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "oldMultiplier",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "newMultiplier",
        type: "uint256"
      }
    ],
    name: "UpdateBoostMultiplier",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
       internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "bool",
        name: "isRegular",
        type: "bool"
      }
    ],
    name: "UpdatePoolParams",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
       internalType: "uint256",
        name: "pid",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "lastRewardBlock",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "lpSupply",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "accWayaPerShare",
        type: "uint256"
      }
    ],
    name: "UpdatePoolReward",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
       internalType: "uint256",
        name: "reserveRate",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "regularFarmRate",
        type: "uint256"
      },
      {
        indexed: false,
       internalType: "uint256",
        name: "specialFarmRate",
        type: "uint256"
      }
    ],
    name: "UpdateWayaRate",
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
        indexed: false,
       internalType: "bool",
        name: "isValid",
        type: "bool"
      }
    ],
    name: "UpdateWhiteList",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
       internalType: "address",
        name: "oldAdmin",
        type: "address"
      },
      {
        indexed: true,
       internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "UpdatefinancialController",
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
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "ACC_WAYA_PRECISION",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "BOOST_PRECISION",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_BOOST_PRECISION",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WAYA",
    outputs: [
      {
       internalType: "contract WayaToken",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WAYA_RATE_TOTAL_PRECISION",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "uint256",
        name: "_allocPoint",
        type: "uint256"
      },
      {
       internalType: "contract IERC20",
        name: "_lpToken",
        type: "address"
      },
      {
       internalType: "bool",
        name: "_isRegular",
        type: "bool"
      },
      {
       internalType: "bool",
        name: "_withUpdate",
        type: "bool"
      }
    ],
    name: "addPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "boostContract",
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
    name: "emissionPerBlock",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "financialController",
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
       internalType: "address",
        name: "_user",
        type: "address"
      },
      {
       internalType: "uint256",
        name: "_pid",
        type: "uint256"
      }
    ],
    name: "getBoostMultiplier",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "contract IERC20",
        name: "_newPool",
        type: "address"
      }
    ],
    name: "isPoolRegistered",
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
    inputs: [],
    name: "lastAccruedBlock",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "linkedParams",
    outputs: [
      {
       internalType: "address",
        name: "",
        type: "address"
      },
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
      }
    ],
    name: "linkedPoolInfo",
    outputs: [
      {
       internalType: "contract IERC20",
        name: "_lpTokenAddress",
        type: "address"
      },
      {
        components: [
          {
           internalType: "uint256",
            name: "accWayaPerShare",
            type: "uint256"
          },
          {
           internalType: "uint256",
            name: "lastRewardBlock",
            type: "uint256"
          },
          {
           internalType: "uint256",
            name: "allocPoint",
            type: "uint256"
          },
          {
           internalType: "uint256",
            name: "totalBoostedShare",
            type: "uint256"
          },
          {
           internalType: "bool",
            name: "isRegular",
            type: "bool"
          }
        ],
       internalType: "struct ChiefFarmer.PoolInfo",
        name: "_poolInfo",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "lpToken",
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
    name: "massUpdatePools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
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
       internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "pendingWaya",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "poolInfo",
    outputs: [
      {
       internalType: "uint256",
        name: "accWayaPerShare",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "lastRewardBlock",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "allocPoint",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "totalBoostedShare",
        type: "uint256"
      },
      {
       internalType: "bool",
        name: "isRegular",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLength",
    outputs: [
      {
       internalType: "uint256",
        name: "pools",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "bool",
        name: "_withUpdate",
        type: "bool"
      }
    ],
    name: "reserveWaya",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "totalRegularAllocPoint",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSpecialAllocPoint",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "address",
        name: "_newBoostContract",
        type: "address"
      }
    ],
    name: "updateBoostContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "address",
        name: "_user",
        type: "address"
      },
      {
       internalType: "uint256",
        name: "_pid",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "_newMultiplier",
        type: "uint256"
      }
    ],
    name: "updateBoostMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "uint256",
        name: "_newEmissionPerBlock",
        type: "uint256"
      }
    ],
    name: "updateEmissionPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "address",
        name: "_newFC",
        type: "address"
      }
    ],
    name: "updateFinancialController",
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
      },
      {
       internalType: "uint256",
        name: "_allocPoint",
        type: "uint256"
      },
      {
       internalType: "bool",
        name: "_isRegular",
        type: "bool"
      },
      {
       internalType: "bool",
        name: "_withUpdate",
        type: "bool"
      }
    ],
    name: "updatePoolParams",
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
    name: "updatePoolReward",
    outputs: [
      {
        components: [
          {
           internalType: "uint256",
            name: "accWayaPerShare",
            type: "uint256"
          },
          {
           internalType: "uint256",
            name: "lastRewardBlock",
            type: "uint256"
          },
          {
           internalType: "uint256",
            name: "allocPoint",
            type: "uint256"
          },
          {
           internalType: "uint256",
            name: "totalBoostedShare",
            type: "uint256"
          },
          {
           internalType: "bool",
            name: "isRegular",
            type: "bool"
          }
        ],
       internalType: "struct ChiefFarmer.PoolInfo",
        name: "pool",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "uint256",
        name: "_reserveRate",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "_regularFarmRate",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "_specialFarmRate",
        type: "uint256"
      },
      {
       internalType: "bool",
        name: "_withUpdate",
        type: "bool"
      }
    ],
    name: "updateWayaRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "address",
        name: "_user",
        type: "address"
      },
      {
       internalType: "bool",
        name: "_isValid",
        type: "bool"
      }
    ],
    name: "updateWhiteList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
       internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userInfo",
    outputs: [
      {
       internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "rewardDebt",
        type: "uint256"
      },
      {
       internalType: "uint256",
        name: "boostMultiplier",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
       internalType: "bool",
        name: "_isRegular",
        type: "bool"
      }
    ],
    name: "wayaPerBlock",
    outputs: [
      {
       internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "wayaPerBlockToReserve",
    outputs: [
      {
       internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "wayaRateToRegularFarm",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "wayaRateToReserve",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "wayaRateToSpecialFarm",
    outputs: [
      {
       internalType: "uint256",
        name: "",
        type: "uint256"
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
    name: "whiteList",
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
