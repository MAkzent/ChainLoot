import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import icons from 'lib/fontawesome';
import style from './FontAwesomeIcon.module.scss';

type Props = {
  icon: string;
  spin?: boolean;
};

const FaIcon = ({ icon, spin }: Props) => {
  return <FontAwesomeIcon className={cn([style.fa, { [style.spin]: spin }])} icon={icons[icon]} />;
};

export default FaIcon;
