import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ethers, providers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import Layout from 'components/Layout';
import 'styles/globals.scss';
import Web3ConnectProvider from 'providers/Web3ConnectProvider';
import Web3InteractionProvider from 'providers/Web3InteractionProvider';

import Modal from 'react-modal';

Modal.setAppElement('#__next');

function getLibrary(provider: providers.ExternalProvider) {
  return new ethers.providers.Web3Provider(provider);
}

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>💎⚡ LootVault</title>
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:url' content='https://blockloot.vercel.app/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='💎⚡ LootVault' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content='Reinventing Fan Memberships with NFTs and DeFi.' />
        <meta name='twitter:image' content='images/mask-2.png' />
        <meta property='og:description' content='Reinventing Fan Memberships with NFTs and DeFi.' />
        <meta property='og:image' content='images/mask-2.png' />
        <meta name='viewport' content='width=device-width' />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ConnectProvider>
          <Web3InteractionProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Web3InteractionProvider>
        </Web3ConnectProvider>
      </Web3ReactProvider>
    </React.Fragment>
  );
}

export default App;
