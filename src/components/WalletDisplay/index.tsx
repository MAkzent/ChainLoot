import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connectorList, magic } from 'providers/Web3ConnectProvider/connectors';
import Modal from 'components/Modal';
import styles from './WalletDisplay.module.scss';
import FaIcon from 'components/FontAwesomeIcon';

const walletDisplay = () => {
  const [showWeb3ConnectModal, setShowWeb3ConnectModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { activate } = useWeb3React();

  return (
    <div>
      <button className={styles.button} onClick={() => setShowWeb3ConnectModal(true)}>
        Fan Sign In
      </button>

      <Modal onClose={() => setShowWeb3ConnectModal(false)} isOpen={showWeb3ConnectModal} header={'Connect Wallet'}>
        <div className={styles.note}>
          <FaIcon icon='farExclamationTriangle' />
          <span>For Metamask: Please make sure you are connected to Kovan Testnet</span>
        </div>
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
              }}>
              {loading ? '...' : 'Login'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default walletDisplay;
