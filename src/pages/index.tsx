import style from './index.module.scss';
import FontAwesomeIcon from 'components/FontAwesomeIcon';
import AppLink from 'components/AppLink';

export default function home() {
  const comingSoon = () => {
    if (typeof window !== 'undefined') {
    }
    window.alert('coming soon!');
  };

  return (
    <div>
      <div className={style.hero}>
        <div>
          <div className={style.headline}>Welcome</div>
          <div className={style.explanation}>
            <p>
              At LootVault we want to provide you with the best possible experience with your favorite creator. If you
              need support with any transactions or have general questions, please reach out.
            </p>
            <p>
              Check out some juicy news below or dive right in to explore a new world of experiences devliered by
              MrRoflWaffles himself!
            </p>
            <p>
              If you are new to cryptocurrencies or NFT, we have linked some resources that will help you get started.
            </p>
          </div>
        </div>
        <div className={style.waffles}>
          <img src='/images/waffle.png' />
          <div>
            <span>
              Hi Guys,
              <br />
              MrRoflWaffles
              <br />
              Here.
            </span>
          </div>
          <div className={style.waffles__links}>
            <button onClick={comingSoon}>What is an NFT</button>
            <button onClick={comingSoon}>Cryptocurrencies</button>
            <button onClick={comingSoon}>Setup a Wallet</button>
          </div>
        </div>
      </div>
      <div className={style.title}>News and Updates</div>
      <AppLink href='/memberships' className={style.buy}>
        <FontAwesomeIcon icon='fasGem' />
        Released: MrWaffleFace Membership NFT are now available!
      </AppLink>
      <div className={style.updates}>
        <div className={style.updates__update}>
          <img src='images/update0.png' />
          <div>MrRoflWaffles posted a new video, go check it out!</div>
        </div>
        <div className={style.updates__update}>
          <img src='images/update1.png' />
          <div>A new experience was released! Claim your signed Tee now.</div>
        </div>
        <div className={style.updates__update}>
          <img src='images/update2.png' />
          <div>Check out this gameplay tutorial and tell us what you think!</div>
        </div>
      </div>
    </div>
  );
}
