import { ReactNode } from 'react';
import Link from 'next/link';

interface AppLinkProps {
  href: string;
  as?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  target?: string;
}

const AppLink = ({ href, as, children, ...rest }: AppLinkProps) => {
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  return isInternalLink ? (
    <Link {...{ href, as }} passHref>
      <a {...rest}>{children}</a>
    </Link>
  ) : (
    <a {...{ href, target: '_blank', rel: 'noopener noreferrer', ...rest }}>
      {children}
    </a>
  );
};

export default AppLink;
