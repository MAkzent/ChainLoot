import cn from 'classnames';
import styles from './memberships.module.scss';
import nftInfos from 'lib/nftInfos.json';
import { INFTInfos, particleId } from 'types';
import useWeb3Interaction from 'hooks/useWeb3Interaction';
import { useState } from 'react';
import Modal from 'components/Modal';
import experiences from 'lib/experiences.json';
import AppLink from 'components/AppLink';

const Memberships = () => {
  const TIERS = Object.keys(nftInfos).map(number => (nftInfos as INFTInfos)[number]);
  const { mintChargedParticle, daiApproved, approveDai } = useWeb3Interaction();
  const [showApproveModal, setShowApproveModal] = useState(false);

  const MAX_SUPPLIES = [1000, 200, 50];

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

  const renderSeeAll = () => {
    return (
      <AppLink href='/experiences' className={styles.placeholder}>
        Show All Experiences
      </AppLink>
    );
  };

  return (
    <div>
      <div className={styles.headline}>Membership Tiers - Summer 2021</div>
      <div className={styles.tiers}>
        {TIERS.map((tier, index) => (
          <div className={cn([styles.tiers__tier, styles[`tiers__tier--${index}`]])} key={index}>
            <img src={tier.image} />
            <div className={styles.tiers__tier__footer}>
              <p>{tier.name}</p>
              <span>$ {tier.price}</span>
            </div>
            <div className={styles.perks}>
              <span>{MAX_SUPPLIES[index].toLocaleString()}</span>
              <span>Max Supply</span>
            </div>
            <div className={styles.xp}>
              <div className={styles.xp__bars}>
                {Array.from(Array(Math.floor(tier.xp / 1000) + 1).keys()).map(barIndex => (
                  <div className={cn([styles.xp__bar, [styles[`xp__bar--${index}`]]])} key={barIndex}></div>
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
          {experiences?.list.map((experience, index) => {
            if (index < 3) {
              return (
                <div>
                  <div className={styles.experiences__experience}>
                    <img src={experience.image} />
                  </div>
                  <div className={styles.experiences__experience__title}>{experience.title}</div>
                  <div className={styles.experiences__experience__xp}>{experience.cost.toLocaleString()} XP</div>
                </div>
              );
            } else {
              return null;
            }
          })}
          {renderSeeAll()}
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
