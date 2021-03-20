import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { MagicConnector } from '@web3-react/magic-connector';

interface MagicProviderInfo {
  email: string;
}

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.RPC_URL_1 as string,
  3: process.env.RPC_URL_3 as string,
  4: process.env.RPC_URL_4 as string,
  42: process.env.RPC_URL_42 as string,
};

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const walletconnect = new WalletConnectConnector({
  rpc: { 42: RPC_URLS[42] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const magic = ({ email }: MagicProviderInfo) => {
  return new MagicConnector({
    apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
    chainId: 42,
    email,
  });
};

export const connectorList = () => {
  return [
    {
      name: 'Metamask',
      connector: injected,
      slug: 'injected',
    },
    {
      name: 'WalletConnect',
      connector: walletconnect,
      slug: 'walletconnect',
    },
  ];
};
