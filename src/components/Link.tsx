import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Renders a navigation link with optional button styling. */
  variant?: 'text' | 'primary' | 'secondary' | 'quiet';
  children: ReactNode;
}

export function Link({ variant = 'text', className = '', children, ...props }: LinkProps) {
  const classes = variant === 'text' ? className : [styles.button, styles[variant], className].filter(Boolean).join(' ');
  return <a className={classes} {...props}>{children}</a>;
}
