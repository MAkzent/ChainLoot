import React, { useState, useEffect, createContext } from 'react';
import { ethers, providers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { particleId } from 'types';
const daiAddresses = require('lib/daiAddress.json');
const daiAbi = require('lib/abis/dai.json');
const nftInfo = require('lib/nftInfos.json');

// todo: update values later
const CREATOR = '0x72E7cb696cd282E4709AFa2a669dbc74151188Ce';
const REFERRER = '0x0000000000000000000000000000000000000000';

interface Web3ConnectProviderContext {
  daiBalance: number;
  ethBalance: number;
  loadDaiBalance: () => void;
  loadEthBalance: () => void;
  loaded: boolean;
  mintChargedParticle: (id: particleId) => void;
  approveDai: () => void;
  didApproveEnoughDai: (amount: number) => void;
  daiApproved: boolean;
}

export const Context = createContext<Web3ConnectProviderContext>({
  daiBalance: 0,
  ethBalance: 0,
  loadDaiBalance: () => {},
  loadEthBalance: () => {},
  loaded: false,
  mintChargedParticle: () => {},
  approveDai: () => {},
  didApproveEnoughDai: () => {},
  daiApproved: false,
});

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
  const [daiBalance, setDaiBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [daiApproved, setDaiApproved] = useState(false);

  useEffect(() => {
    loadDaiBalance();
    loadEthBalance();
    loadApproveDai();
  }, [account, chainId]);

  const loadDaiBalance = async () => {
    if (chainId && account) {
      setLoaded(false);
      const daiContract = new ethers.Contract(daiAddresses[chainId], daiAbi, library);
      const daiBalance = await daiContract.balanceOf(account);
      setDaiBalance(Math.round(Number(ethers.utils.formatUnits(daiBalance, 18))));
      setLoaded(true);
    }
  };

  const loadEthBalance = async () => {
    if (chainId && account) {
      setLoaded(false);
      library?.getBalance(account).then((balance: any) => {
        let balanceInEth = ethers.utils.formatEther(balance);
        setEthBalance(Number(Number(balanceInEth).toFixed(2)));
        setLoaded(true);
      });
    }
  };

  const loadApproveDai = async () => {
    if (chainId && account) {
      const didApprove = (await didApproveEnoughDai(10000)) || false;
      setDaiApproved(didApprove);
    }
  };

  const approveDai = async () => {
    if (chainId !== 42) return window.alert('Please switch to Kovan Network');
    if (!library) return window.alert('Please connect to Web3');
    const kovanAddresses = require('@charged-particles/protocol-subgraph/networks/kovan');
    const signer = library.getSigner(account as string);
    const daiContract = new ethers.Contract(daiAddresses[chainId], daiAbi, signer);
    try {
      await daiContract.approve(kovanAddresses.chargedParticles.address, ethers.utils.parseEther(String(10000000)));
    } catch (e) {
      console.error('error in approving dai:', e);
    }
  };

  const didApproveEnoughDai = async (value: number) => {
    if (chainId !== 42) return window.alert('Please switch to Kovan Network');
    if (!library) return window.alert('Please connect to Web3');
    const kovanAddresses = require('@charged-particles/protocol-subgraph/networks/kovan');
    const signer = library.getSigner(account as string);
    const daiContract = new ethers.Contract(daiAddresses[chainId], daiAbi, signer);
    try {
      const approved = await daiContract.allowance(account, kovanAddresses.chargedParticles.address);
      return Math.round(Number(ethers.utils.formatUnits(approved, 18))) > value;
    } catch (e) {
      console.error('error in reading dai approval:', e);
    }
  };

  const mintChargedParticle = async (id: particleId) => {
    if (chainId !== 42) return window.alert('Please switch to Kovan Network');
    if (!library) return window.alert('Please connect to Web3');
    const kovanAddresses = require('@charged-particles/protocol-subgraph/networks/kovan');
    const protonAbi = require('@charged-particles/protocol-subgraph/abis/Proton');
    const protonAddress = kovanAddresses.proton.address;
    const signer = library.getSigner(account as string);
    const protonContract = new ethers.Contract(protonAddress, protonAbi, signer);
    console.log(protonAddress);

    console.log({
      creator: CREATOR,
      account: account,
      referrer: REFERRER,
      metadataURI: nftInfo[id].uri,
      walletManagerId: 'aave',
      assetToken: daiAddresses[chainId],
      assetAmount: ethers.utils.parseEther(String(nftInfo[id].price)),
      annuityPercent: 100,
    });
    console.log(protonContract.createChargedParticle);
    // interface: https://docs.charged.fi/charged-particles-protocol/smart-contracts-documentation/contracts/proton-contract#createchargedparticle
    // todo: add a relayer contract (so that uri, price, percent is decided by creator)
    try {
      const mintingTx = await protonContract.createChargedParticle(
        CREATOR,
        account,
        REFERRER,
        nftInfo[id].uri,
        'aave',
        daiAddresses[chainId],
        ethers.utils.parseEther(String(nftInfo[id].price)),
        100
      );
      console.log(mintingTx);
    } catch (e) {
      console.error('error in minting particle: ', e);
    }
  };

  return (
    <Context.Provider
      value={{
        daiBalance,
        ethBalance,
        loadDaiBalance,
        loadEthBalance,
        loaded,
        mintChargedParticle,
        approveDai,
        didApproveEnoughDai,
        daiApproved,
      }}>
      {children}
    </Context.Provider>
  );
};

export default Web3ConnectProvider;
