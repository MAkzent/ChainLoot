import styles from './ExperienceCard.module.scss';

interface IExperience {
  experience: {
    title: string;
    image: string;
    description: string;
    cost: number;
    minted: number;
    maxMinted: number;
  };
}

const index = ({ experience }: IExperience) => {
  const maxCurrentXp = 500;
  const redeem = () => {
    //
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
        <button onClick={redeem}> Redeem</button>
      )}
    </div>
  );
};

export default index;
