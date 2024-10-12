export const farmBoosterABI = [
    {
      inputs: [
        {
          internalType: "contract IWayaVault",
          name: "_wayaVault",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_maxBoostedFarm",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_lMaxBoost",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_ControlDifficulties",
          type: "uint256"
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
          internalType: "address",
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "proxy",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        }
      ],
      name: "ActiveFarmPool",
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
          internalType: "address",
          name: "proxy",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        }
      ],
      name: "DeactiveFarmPool",
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
          name: "user",
          type: "address"
        },
        {
          indexed: false,
          internalType: "address",
          name: "proxy",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        }
      ],
      name: "Refresh",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "pid",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "bool",
          name: "status",
          type: "bool"
        }
      ],
      name: "UpdateBoostedFarms",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "factory",
          type: "address"
        }
      ],
      name: "UpdateBoosterFactory",
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
          internalType: "address",
          name: "proxy",
          type: "address"
        }
      ],
      name: "UpdateBoosterProxy",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "oldValue",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newValue",
          type: "uint256"
        }
      ],
      name: "UpdateControlDifficulties",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "oldValue",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newValue",
          type: "uint256"
        }
      ],
      name: "UpdateLMaxBoost",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "max",
          type: "uint256"
        }
      ],
      name: "UpdateMaxBoostedFarms",
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
      name: "UpdatePoolBoostMultiplier",
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
          name: "lockedAmount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "lockedDuration",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "totalLockedAmount",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "maxLockDuration",
          type: "uint256"
        }
      ],
      name: "UpdateWayaVault",
      type: "event"
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
      name: "BOOST_RATIO_PRECISION",
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
      name: "BOOST_WEIGHT_PRECISION",
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
      name: "BoosterFactory",
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
      name: "LMB_PRECISION",
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
      name: "MAX_CD",
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
      name: "MAX_LMB",
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
      name: "MIN_CD",
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
      name: "MIN_LMB",
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
          internalType: "contract IERC20",
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
      name: "activate",
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
        }
      ],
      name: "activedPools",
      outputs: [
        {
          internalType: "uint256[]",
          name: "pools",
          type: "uint256[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "avgLockDuration",
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
      name: "controlDifficulties",
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
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "deactive",
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
        }
      ],
      name: "getUserMultiplier",
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
          name: "_user",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "isBoostedPool",
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
      name: "lMaxBoost",
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
      inputs: [],
      name: "maxBoostedFarms",
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
          name: "_user",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_lockedAmount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_lockedDuration",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_totalLockedAmount",
          type: "uint256"
        },
        {
          internalType: "uint256",
          name: "_maxLockDuration",
          type: "uint256"
        }
      ],
      name: "onWayaPoolUpdate",
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
          internalType: "address",
          name: "",
          type: "address"
        }
      ],
      name: "proxyContract",
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
      name: "refresh",
      outputs: [],
      stateMutability: "nonpayable",
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
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        },
        {
          internalType: "bool",
          name: "_status",
          type: "bool"
        }
      ],
      name: "setBoostedFarms",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_factory",
          type: "address"
        }
      ],
      name: "setBoosterFactory",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_ControlD",
          type: "uint256"
        }
      ],
      name: "setControlDifficulties",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_max",
          type: "uint256"
        }
      ],
      name: "setMaxBoostedFarms",
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
          internalType: "address",
          name: "_proxy",
          type: "address"
        }
      ],
      name: "setProxy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_lMaxBoost",
          type: "uint256"
        }
      ],
      name: "setlMaxBoost",
      outputs: [],
      stateMutability: "nonpayable",
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
          name: "_user",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "_pid",
          type: "uint256"
        }
      ],
      name: "updatePoolBoostMultiplier",
      outputs: [],
      stateMutability: "nonpayable",
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
      name: "userInfo",
      outputs: [
        {
          internalType: "uint256",
          name: "size",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "wayaVault",
      outputs: [
        {
          internalType: "contract IWayaVault",
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
          name: "",
          type: "uint256"
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
    }
  ] as const