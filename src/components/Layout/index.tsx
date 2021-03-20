import { WithChildren } from 'types';
import { useWeb3React } from '@web3-react/core';
import Sidebar from 'components/Sidebar';
import style from './Layout.module.scss';
import Landing from 'components/Landing';

const Layout = ({ children }: WithChildren) => {
  const { account } = useWeb3React();
  return (
    <>
      {account ? (
        <div className={style.container}>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <div className={style.body}>{children}</div>
        </div>
      ) : (
        <Landing />
      )}
    </>
  );
};

export default Layout;
