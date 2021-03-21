import styles from './NFT.module.scss';
import { IProton } from 'types';

interface NFTAsset {
  asset: IProton;
}

const index = ({ asset }: NFTAsset) => {
  console.log(asset);
  // todo:
  // mapping from tier to max XP
  return (
    <div className={styles.asset}>
      <img
        // src={asset.image}
        src='https://ipfs.io/ipfs/QmUWRyF7988EVaJtrvFRYVQvK25ypY7fBd2Qo5uqxoVKYu'
      />
      <div className={styles.asset__info}>
        <div className={styles.asset__info__headline}> {asset.name}</div>
        {/* <div className={styles.asset__info__description}> {asset.description}</div> */}
        <div className={styles.xp}>
          <div className={styles.xp__inner}></div>
          <div className={styles.xp__text}> 1,200 / 20,000 XP</div>
        </div>
      </div>
    </div>
  );
};

export default index;
