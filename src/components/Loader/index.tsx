import FontAwesomeIcon from 'components/FontAwesomeIcon';
import style from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={style.loader__wrapper}>
      <div className={style.loader} />
      <FontAwesomeIcon icon="fasBolt" />
    </div>
  );
};

export default Loader;
