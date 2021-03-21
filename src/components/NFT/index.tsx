import styles from './NFT.module.scss';
import { IProton } from 'types';

interface NFTAsset {
  asset: IProton;
}

const index = ({ asset }: NFTAsset) => {
  console.log(asset);
  return (
    <div className={styles.asset}>
      <img src={asset.image} />
      <div className={styles.asset__info}>
        <div className={styles.asset__info__headline}> {asset.name}</div>
        {/* <div className={styles.asset__info__description}> {asset.description}</div> */}
        <div className={styles.xp}>
          <div className={styles.xp__inner}></div>
          <div className={styles.xp__text}> 300 / 400 XP</div>
        </div>
      </div>
    </div>
  );
};

export default index;
