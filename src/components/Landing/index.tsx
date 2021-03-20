import style from './Landing.module.scss';
import WalletDisplay from 'components/WalletDisplay';
import FontAwesomeIcon from 'components/FontAwesomeIcon';

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <FontAwesomeIcon icon='fasGem' />
        Patreon 3.0
      </div>
      <div className={style.connect}>
        <WalletDisplay />
      </div>
    </div>
  );
};

export default Landing;
