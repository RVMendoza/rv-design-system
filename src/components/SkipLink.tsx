import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './SkipLink.module.css';
export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}
export function SkipLink({ children = 'Skip to main content', ...props }: SkipLinkProps) {
  return (
    <a className={styles['rvds-skip-link']} href="#main-content" {...props}>
      {children}
    </a>
  );
}
