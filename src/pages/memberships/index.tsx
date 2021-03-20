import cn from 'classnames';
import styles from './memberships.module.scss';
import nftInfos from 'lib/nftInfos.json';
import { INFTInfos, particleId } from 'types';
import useWeb3Interaction from 'hooks/useWeb3Interaction';
import { useState } from 'react';
import Modal from 'components/Modal';
import experiences from 'lib/experiences.json';

const Memberships = () => {
  const TIERS = Object.keys(nftInfos).map(number => (nftInfos as INFTInfos)[number]);
  const { mintChargedParticle, daiApproved, approveDai } = useWeb3Interaction();
  const [showApproveModal, setShowApproveModal] = useState(false);

  const handleBuy = async (id: particleId) => {
    if (!daiApproved) {
      return setShowApproveModal(true);
    }
    try {
      await mintChargedParticle(id);
    } catch (e) {
      console.error(e);
    }
  };

  const onApprove = async () => {
    await approveDai();
    setShowApproveModal(false);
  };

  return (
    <div>
      <div className={styles.headline}>Membership Tiers - Summer Season 2021</div>
      <div className={styles.tiers}>
        {TIERS.map((tier, index) => (
          <div className={cn([styles.tiers__tier, styles[`tiers__tier--${index}`]])} key={index}>
            <img src={tier.image} />
            <div className={styles.tiers__tier__footer}>
              <p>{tier.name}</p>
              <span>$ {tier.price}</span>
            </div>
            {/* <div className={styles.perks}>
              <span>- Discord Role</span>
              <span>- Shop Discounts</span>
              <span>- Offline Experiences</span>
            </div> */}
            <div className={styles.xp}>
              <div className={styles.xp__bars}>
                {Array.from(Array(Math.floor(tier.xp / 1000) + 1).keys()).map(index => (
                  <div className={styles.xp__bar} key={index}></div>
                ))}
              </div>
              <span>{tier.xp.toLocaleString()} XP / month</span>
            </div>
            <button onClick={() => handleBuy(tier.id as particleId)}>Buy Membership</button>
          </div>
        ))}
      </div>
      <div className={styles.headline}>Unlockable Experiences</div>
      <div className={styles.headline}>
        <div className={styles.experiences}>
          {experiences?.list.map(() => (
            <div className={styles.experiences__experience}></div>
          ))}
        </div>
      </div>
      <Modal isOpen={showApproveModal} onClose={() => setShowApproveModal(false)} header='Approve DAI'>
        <div className={styles.approve}>
          You need to approve DAI before you can purchase a Membership.
          <button onClick={onApprove}>Approve DAI</button>
        </div>
      </Modal>
    </div>
  );
};

export default Memberships;
