import styles from './NFT.module.scss';
import { IProton } from 'types';
import cn from 'classnames';

interface NFTAsset {
  asset: IProton;
}

const index = ({ asset }: NFTAsset) => {
  const getId = () => {
    if (asset.name.includes('Legendary')) return 2;
    if (asset.name.includes('Super')) return 1;
    return 0;
  };

  const MAX_XP = [15000, 20000, 30000];

  const CURRENT_XP = 1200;

  return (
    <div className={styles.asset}>
      <img src={asset.image} />
      <div className={styles.asset__info}>
        <div className={styles.asset__info__headline}> {asset.name}</div>
        <div className={cn([styles.xp, styles[`xp--${getId()}`]])}>
          <div
            className={cn([styles.xp__inner, styles[`xp__inner--${getId()}`]])}
            style={{ width: `${(CURRENT_XP / MAX_XP[getId()]) * 100}%` }}
          />
          <div className={styles.xp__text}>
            {CURRENT_XP.toLocaleString()} / {MAX_XP[getId()].toLocaleString()} XP
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
