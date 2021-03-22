## Initial Setup

_Requires Node 12.20.0_

1. Obtain an authentication token for Font Awesome and set in the `npm` configuration:

```bash
npm config set "@fortawesome:registry" https://npm.fontawesome.com/
npm config set "//npm.fontawesome.com/:_authToken" ${TOKEN}
```

2. Set your env variables in `env.local`

```md
NEXT_PUBLIC_MAGIC_API_KEY=...
NEXT_PUBLIC_RPC_URL_1=https://mainnet.infura.io/v3/...
NEXT_PUBLIC_RPC_URL_3=https://ropsten.infura.io/v3/...
NEXT_PUBLIC_RPC_URL_4=https://rinkeby.infura.io/v3/...
NEXT_PUBLIC_RPC_URL_42=https://kovan.infura.io/v3/...
```

3. Install dependencies with `yarn`

```bash
yarn install
```

## Development

- `yarn dev` will boot the client on [localhost:3000](localhost:3000)

## How to use

DEMO: https://lootvault.vercel.app/

- Make sure to be connected to Kovan Testnet
- You can use these faucets to get Kovan ETH and DAI (Aave):
  - ETH: https://gitter.im/kovan-testnet/faucet (drop your address in the chat)
  - DAI: https://testnet.aave.com/faucet/DAI
- Please refresh the page after you approved a tx or bought an NFT
- Enjoy!
