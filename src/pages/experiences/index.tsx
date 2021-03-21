import NFT from 'components/NFT';
import AppLink from 'components/AppLink';
import styles from './experiences.module.scss';
import useWeb3Interaction from 'hooks/useWeb3Interaction';
import experiences from 'lib/experiences.json';
import ExperienceCard from 'components/ExperienceCard';

const Experiences = () => {
  const { myAssets } = useWeb3Interaction();

  const renderSeeAll = () => {
    return <div className={styles.placeholder}>See All Memberships</div>;
  };
  return (
    <div>
      <div className={styles.headline}>Your Experiences</div>
      <div className={styles.nfts__list}>
        {myAssets.length ? (
          <div className={styles.row}>
            {myAssets.map((asset, index) => {
              if (index < 2) {
                return <NFT key={index} asset={asset} />;
              }
              return null;
            })}
            {renderSeeAll()}
          </div>
        ) : (
          <div className={styles.nfts__list__buy}>
            <span>Looks like you're not a member yet.</span>
            <AppLink href={'/memberships'}>Buy Membership</AppLink>
          </div>
        )}
        <div className={styles.container}>
          {experiences?.list.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
