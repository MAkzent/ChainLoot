import style from './Landing.module.scss';
import WalletDisplay from 'components/WalletDisplay';
import FontAwesomeIcon from 'components/FontAwesomeIcon';
import FaIcon from 'components/FontAwesomeIcon';
import AppLink from 'components/AppLink';

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.hero}>
        <video autoPlay muted loop id='video'>
          <source src='/video/trailer.mp4' type='video/mp4' />
        </video>
        <div className={style.hero__wrapper}>
          <div className={style.header}>
            <img src='/images/logo_text.png'></img>
          </div>
          <span>Turn your savings into exclusive experiences.</span>
          <div className={style.connect}>
            <WalletDisplay />
            <AppLink href='https://f85cwkcutw8.typeform.com/to/BHRTqBRM'>Creator Signup</AppLink>
          </div>
          <div className={style.content}>
            <div className={style.content__wrapper}>
              <FaIcon icon='fasMoneyCheckAlt' />
              <span>Lock DAI to claim a Membership NFT.</span>
              <div className={style.content__wrapper__number}>1</div>
            </div>
            <div className={style.content__wrapper}>
              <img src='/images/xp.png' />
              <span>Earn XP the longer you hold the NFT.</span>
              <div className={style.content__wrapper__number}>2</div>
            </div>
            <div className={style.content__wrapper}>
              <FaIcon icon='fasGem' />
              <span>Spend XP on exclusive fan rewards.</span>
              <div className={style.content__wrapper__number}>3</div>
            </div>
            <div className={style.content__wrapper}>
              <FaIcon icon='fasUndoAlt' />
              <span>Burn your NFT to get your DAI back at any time.</span>
              <div className={style.content__wrapper__number}>4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
