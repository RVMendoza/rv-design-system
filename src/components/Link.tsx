import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Renders a navigation link with optional button styling. */
  variant?: 'text' | 'primary' | 'secondary' | 'quiet' | 'subtle';
  /** Expands a button-styled link to its container width. */
  fullWidth?: boolean;
  children: ReactNode;
}

export function Link({
  variant = 'text',
  fullWidth = false,
  className = '',
  children,
  ...props
}: LinkProps) {
  const classes =
    variant === 'text'
      ? [styles['rvds-link'], className].filter(Boolean).join(' ')
      : [
          styles['rvds-button'],
          styles[`rvds-button--${variant}`],
          fullWidth ? styles['rvds-button--full-width'] : '',
          className,
        ]
          .filter(Boolean)
          .join(' ');
  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
