import Modal from 'components/Modal';
import useWeb3Interaction from 'hooks/useWeb3Interaction';
import { useState } from 'react';
import cn from 'classnames';
import { IProton } from 'types';
import styles from './ExperienceCard.module.scss';
import { useWeb3React } from '@web3-react/core';

interface IExperienceCard {
  experience: IExperience;
}

interface IExperience {
  title: string;
  image: string;
  description: string;
  cost: number;
  minted: number;
  maxMinted: number;
}

const index = ({ experience }: IExperienceCard) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<IExperience>();
  const [selectedNFT, setSelectedNFT] = useState<IProton>();
  const { myAssets } = useWeb3Interaction();
  const { library } = useWeb3React();
  const maxCurrentXp = myAssets.length ? 1200 : 0;
  const redeem = (experience: IExperience) => {
    setSelectedExperience(experience);
    setShowConfirmModal(true);
    setSelectedNFT(myAssets[0]);
  };

  const finishRedeem = async () => {
    await library.getSigner().signMessage(`Spend ${experience.cost} to unlock ${experience.title}.`);
  };
  return (
    <div className={styles.experience}>
      {experience.maxMinted ? (
        <div className={styles.limited}>
          <span>
            {experience.minted}/{experience.maxMinted}
          </span>
          <small>Claimed</small>
        </div>
      ) : null}
      <div className={styles.experience__title}>{experience.title}</div>
      <img src={experience.image} />
      <div className={styles.experience__description}>{experience.description}</div>
      {maxCurrentXp < experience.cost ? (
        <div className={styles.xp}>
          <div className={styles.xp__inner} style={{ width: `${(maxCurrentXp / experience.cost) * 100}%` }} />
          <div className={styles.xp__text}>
            {maxCurrentXp.toLocaleString()} / {experience.cost.toLocaleString()} XP
          </div>
        </div>
      ) : (
        <button onClick={() => redeem(experience)}> Redeem</button>
      )}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        header={'Confirm Experience Purchase'}>
        <div className={styles.modal}>
          <div className={styles.modal__header}>One last step ...</div>
          <img src={selectedExperience?.image} />
          <div className={styles.modal__title}>{selectedExperience?.title}</div>
          <div className={styles.modal__details}>
            <div className={styles.modal__amount}>{selectedExperience?.cost.toLocaleString()} XP</div>
            <small>Will be deducted from your NFT.</small>
          </div>
          <div className={styles.modal__choose}>Choose NFT to deduct XP</div>
          <div className={styles.modal__nfts}>
            {myAssets.map(asset => (
              <div
                className={cn([
                  styles.modal__nfts__asset,
                  { [styles['modal__nfts__asset--selected']]: selectedNFT?.id === asset.id },
                ])}
                onClick={() => setSelectedNFT(asset)}>
                <img src={asset.image} />
                <small>1,200 XP</small>
              </div>
            ))}
          </div>
          <button disabled={!selectedNFT} onClick={finishRedeem}>
            Confirm and Pay
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default index;
