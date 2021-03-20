import React, { useState, useEffect, createContext } from 'react';
import { providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from '../../hooks/useWeb3';

interface Web3ConnectProviderContext {}

export const Context = createContext<Web3ConnectProviderContext>({});

// documentation: https://codesandbox.io/s/github/NoahZinsmeister/web3-react/tree/v6/example?fontsize=14&hidenavigation=1&theme=dark&file=/pages/index.tsx:2639-2771

const Web3ConnectProvider: React.FC = ({ children }) => {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React<providers.Web3Provider>();

  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default Web3ConnectProvider;
