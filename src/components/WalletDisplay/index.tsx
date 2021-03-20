import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectorList, magic } from 'providers/Web3ConnectProvider/connectors';
import { chainToString } from 'hooks/useWeb3';
import Modal from 'components/Modal';
import styles from './WalletDisplay.module.scss';

const walletDisplay = () => {
  const [showWeb3ConnectModal, setShowWeb3ConnectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { activate } = useWeb3React();

  return (
    <div>
      <button className={styles.button} onClick={() => setShowWeb3ConnectModal(true)}>
        Connect Wallet
      </button>

      <Modal onClose={() => setShowWeb3ConnectModal(false)} isOpen={showWeb3ConnectModal} header={'Connect Wallet'}>
        <div className={styles.container}>
          {connectorList().map((connector, index) => (
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  await activate(connector.connector);
                  setLoading(false);
                  setShowWeb3ConnectModal(false);
                } catch (e) {
                  console.error(e);
                }
              }}
              key={index}>
              {loading ? '...' : connector.name}
            </button>
          ))}
        </div>
        <div className={styles.input}>
          <div className={styles.input__header}>Email Signup</div>
          <div className={styles.input__wrapper}>
            <input
              className='w-full border py-2 px-3 rounded text-black dark:text-white dark:bg-black'
              type='email'
              name='email'
              id='email'
              placeholder='example@email.com'
              onChange={e => setEmail(e.target.value)}
            />
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  await activate(magic({ email }));
                  setShowWeb3ConnectModal(false);
                  setLoading(false);
                } catch (e) {
                  console.error(e);
                }
              }}
              className='w-full sm:w-auto mt-2 sm:mt-0 text-sm border px-3 py-2 rounded hover:bg-black hover:text-white dark:hover:bg-gray dark:hover:text-black'>
              {loading ? '...' : 'Login'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default walletDisplay;
