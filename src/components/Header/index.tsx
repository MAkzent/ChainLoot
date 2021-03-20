import styles from './Header.module.scss';

interface IHeader {
  imgUrl: string;
}

const Header = ({ imgUrl }: IHeader) => {
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: '10% 25%',
        backgroundSize: 'cover',
      }}
    >
      {/* <div className={styles.header__inner}>
        <div className={styles.header__title}>{title}</div>
      </div> */}
      {/* <div className={styles.header__subtitle}> {subtitle}</div> */}
    </div>
  );
};

export default Header;
