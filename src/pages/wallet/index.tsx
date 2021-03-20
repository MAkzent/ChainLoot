import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './wallet.module.scss';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import useWeb3Interaction from 'hooks/useWeb3Interaction';

const Wallet = () => {
  const { account } = useWeb3React();
  const { daiBalance, ethBalance, loaded } = useWeb3Interaction();

  const buyDai = () => {
    new RampInstantSDK({
      hostAppName: 'Chain Loot',
      hostLogoUrl: 'https://i.pinimg.com/originals/8b/c5/14/8bc51478525c42e2a556ee5fec169a1d.png',
      swapAmount: '50000000000000000000', // 500 DAI in wei
      swapAsset: 'DAI',
      userAddress: `${account}`,
    }).show();
  };

  const MEMBERSHIPS = [
    {
      name: 'Common',
      image: '/images/mask-0.png',
      price: '0.1',
      xp: 500,
      currentXp: 200,
    },
    {
      name: 'Common',
      image: '/images/mask-0.png',
      price: '0.1',
      xp: 500,
      currentXp: 150,
    },
    {
      name: 'Common',
      image: '/images/mask-0.png',
      price: '0.1',
      xp: 500,
      currentXp: 240,
    },
    {
      name: 'Legendary',
      image: '/images/mask-2.png',
      price: '1',
      xp: 5000,
      currentXp: 2400,
    },
  ];

  return (
    <div>
      <div className={styles.headline}>Your Wallet</div>
      <div className={styles.container}>
        <div className={styles.balances__header}>
          <span>Balances</span>
          <button onClick={buyDai}>Buy DAI</button>
        </div>
        <div className={styles.balances__tokens}>
          <div className={styles.balances__tokens__token}>
            <span>DAI</span>
            <span>$ {loaded ? daiBalance : '...loading'}</span>
          </div>
          <div className={styles.balances__tokens__token}>
            <span>ETH</span>
            <span>Ξ {loaded ? ethBalance : '...loading'}</span>
          </div>
        </div>
        <div className={styles.nfts}>Your Memberships</div>
        <div className={styles.nfts__list}>
          {MEMBERSHIPS.map((tier, index) => (
            <div className={cn([styles.nfts__list__item, styles[`nfts__list__item--${index}`]])} key={index}>
              <img src={tier.image} />
              <span className={styles.nfts__list__item__xp}>Current: {tier.currentXp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;