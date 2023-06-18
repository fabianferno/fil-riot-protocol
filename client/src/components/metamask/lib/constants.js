const RIOT_RPC_URL = process.env.RIOT_RPC_URL || 'https://riot-rpc-server.adaptable.app';

const riotDeviceImages = [
  // 'https://bafkreidmkpibpkguvrnzuqgmudacxji4fl6g437wrtb74t5uliqihuhede.ipfs.nftstorage.link/',
  // 'https://bafkreibufkhlr6kaq4mhb4tpczbwtzm7jx2q7nrnwed2ndk6klrv6da54u.ipfs.nftstorage.link/',
  'https://bafybeice6wite46sx5ztubkuafmxhjmacq6iivhlvl23fokf6ql3mqwc44.ipfs.nftstorage.link/',
];
const protocolAddress = '0x878e67cadea753e407c812c76a15402912003e45';
const protocolABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_createFee',
        type: 'uint256',
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
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'organisationContractAddress',
        type: 'address',
      },
    ],
    name: 'OrganisationCreated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getCreateFee',
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
        name: '_organisationAddress',
        type: 'address',
      },
    ],
    name: 'getOrganisation',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'organisationContractAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'metadata',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct TheRiotProtocol.Organisation',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOrganisations',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'organisationContractAddress',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'metadata',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'exists',
            type: 'bool',
          },
        ],
        internalType: 'struct TheRiotProtocol.Organisation[]',
        name: '_organisations',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'isRiotOrganisation',
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
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_metadata',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_dealClientAddress',
        type: 'address',
      },
    ],
    name: 'registerOrganisation',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_fee',
        type: 'uint256',
      },
    ],
    name: 'setCreateFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const clientAddress = '';
const clientABI = [];
const organisationABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'addBalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'authenticateMessage',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'dealNotify',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dealsLength',
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
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getDealByIndex',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'piece_cid',
            type: 'bytes',
          },
          {
            internalType: 'uint64',
            name: 'piece_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'verified_deal',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'label',
            type: 'string',
          },
          {
            internalType: 'int64',
            name: 'start_epoch',
            type: 'int64',
          },
          {
            internalType: 'int64',
            name: 'end_epoch',
            type: 'int64',
          },
          {
            internalType: 'uint256',
            name: 'storage_price_per_epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'provider_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'client_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'extra_params_version',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'location_ref',
                type: 'string',
              },
              {
                internalType: 'uint64',
                name: 'car_size',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'skip_ipni_announce',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'remove_unsealed_copy',
                type: 'bool',
              },
            ],
            internalType: 'struct IDealClient.ExtraParamsV1',
            name: 'extra_params',
            type: 'tuple',
          },
        ],
        internalType: 'struct IDealClient.DealRequest',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'proposalId',
        type: 'bytes32',
      },
    ],
    name: 'getDealProposal',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'proposalId',
        type: 'bytes32',
      },
    ],
    name: 'getExtraParams',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'cid',
        type: 'bytes',
      },
    ],
    name: 'getProposalIdSet',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'requestId',
            type: 'bytes32',
          },
          {
            internalType: 'bool',
            name: 'valid',
            type: 'bool',
          },
        ],
        internalType: 'struct IDealClient.RequestId',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'cid',
        type: 'bytes',
      },
    ],
    name: 'getProviderSet',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'provider',
            type: 'bytes',
          },
          {
            internalType: 'bool',
            name: 'valid',
            type: 'bool',
          },
        ],
        internalType: 'struct IDealClient.ProviderSet',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'method',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'handle_filecoin_method',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'bytes',
            name: 'piece_cid',
            type: 'bytes',
          },
          {
            internalType: 'uint64',
            name: 'piece_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'verified_deal',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'label',
            type: 'string',
          },
          {
            internalType: 'int64',
            name: 'start_epoch',
            type: 'int64',
          },
          {
            internalType: 'int64',
            name: 'end_epoch',
            type: 'int64',
          },
          {
            internalType: 'uint256',
            name: 'storage_price_per_epoch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'provider_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'client_collateral',
            type: 'uint256',
          },
          {
            internalType: 'uint64',
            name: 'extra_params_version',
            type: 'uint64',
          },
          {
            components: [
              {
                internalType: 'string',
                name: 'location_ref',
                type: 'string',
              },
              {
                internalType: 'uint64',
                name: 'car_size',
                type: 'uint64',
              },
              {
                internalType: 'bool',
                name: 'skip_ipni_announce',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'remove_unsealed_copy',
                type: 'bool',
              },
            ],
            internalType: 'struct IDealClient.ExtraParamsV1',
            name: 'extra_params',
            type: 'tuple',
          },
        ],
        internalType: 'struct IDealClient.DealRequest',
        name: 'deal',
        type: 'tuple',
      },
    ],
    name: 'makeDealProposal',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'params',
        type: 'bytes',
      },
    ],
    name: 'receiveDataCap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'location_ref',
            type: 'string',
          },
          {
            internalType: 'uint64',
            name: 'car_size',
            type: 'uint64',
          },
          {
            internalType: 'bool',
            name: 'skip_ipni_announce',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'remove_unsealed_copy',
            type: 'bool',
          },
        ],
        internalType: 'struct IDealClient.ExtraParamsV1',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'serializeExtraParamsV1',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'pieceCid',
        type: 'bytes',
      },
    ],
    name: 'updateActivationStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'client',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'withdrawBalance',
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
];
const chains = [
  {
    name: 'Calibration Testnet',
    chainId: 314159,
    coinName: 'tFIL',
    icon: '/filecoin.png',
    rpc: 'https://api.calibration.node.glif.io/rpc/v1',
    isMainnet: false,
    blockExplorer: 'https://fvm.starboard.ventures/calibration/explorer/',
  },
];
export {
  protocolAddress,
  protocolABI,
  clientAddress,
  clientABI,
  organisationABI,
  chains,
  RIOT_RPC_URL,
  riotDeviceImages,
};
