import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useWeb3React } from '@web3-react/core';
import AppLink from 'components/AppLink';
import FontAwesomeIcon from 'components/FontAwesomeIcon';
import style from './Sidebar.module.scss';
import { chainToString } from 'hooks/useWeb3';

const Sidebar = () => {
  const router = useRouter();
  const [ensName, setEnsName] = useState('');
  const { account, chainId, library, deactivate } = useWeb3React();

  useEffect(() => {
    if (account) {
      setEnsNameAsync();
    }
  }, [account]);

  const setEnsNameAsync = useCallback(async () => {
    if (chainId === 1) {
      const name = await library.lookupAddress(account);
      setEnsName(name);
    } else {
      setEnsName('');
    }
  }, [account, chainId]);

  const MAIN_ROUTES = [
    {
      path: '/',
      activeIcon: 'fasHome',
      inactiveIcon: 'falHome',
      name: 'Home',
    },
    {
      path: '/memberships',
      activeIcon: 'fasCreditCardBlank',
      inactiveIcon: 'falCreditCardBlank',
      name: 'Memberships',
    },
    {
      path: '/experiences',
      activeIcon: 'fasStars',
      inactiveIcon: 'falStars',
      name: 'Experiences',
    },
    {
      path: '/wallet',
      activeIcon: 'fasGem',
      inactiveIcon: 'falGem',
      name: 'Wallet',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === path;
    } else {
      return router.pathname.includes(path);
    }
  };

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__inner}>
        <div className={style.sidebar__inner__top}>
          <div className={style.logo}>
            <img src='/images/logo.png' />
            <span>LootVault</span>
          </div>
          <div className={style.links}>
            {MAIN_ROUTES.map(route => (
              <AppLink
                key={route.path}
                href={route.path}
                className={cn(style.links__link, {
                  [style.active]: isActive(route.path),
                })}>
                <FontAwesomeIcon icon={isActive(route.path) ? route.activeIcon : route.inactiveIcon} />
                {route.name}
              </AppLink>
            ))}
          </div>
        </div>
        <div className={style.links}>
          {account && (
            <div className={cn([style.links__link, style.noHover, style.noOpacity])}>
              <FontAwesomeIcon icon='falUser' />
              <div className={style.account}>
                <div className={style.account__name}>
                  {ensName
                    ? ensName
                    : `${account.substring(0, 6)}…${account.substring(account.length - 5)}`.toLocaleLowerCase()}
                </div>
                <div className={style.account__chain}>{chainToString(chainId as number)}</div>
              </div>
            </div>
          )}
          <div onClick={deactivate} className={cn(style.links__link, style.logout)}>
            <FontAwesomeIcon icon='farSignOut' />
            Logout
          </div>
          <div className={style.creator}>
            <img src='/images/waffle.png' />
            <span>MrRoflWaffles</span>
          </div>
          {/* <AppLink
            className={cn([style.links__link, style.noOpacity])}
            href={'https://www.notion.so/niftyarena/Nifty-Arena-bfcc39478cab46399d44e9a1c5940b85'}>
            <FontAwesomeIcon icon='falLightbulb' />
            Documentation
          </AppLink> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
