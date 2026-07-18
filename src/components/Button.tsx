import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. Does not change the button's semantic purpose. */
  variant?: 'primary' | 'secondary' | 'quiet';
  /** Announces progress and prevents repeat activation. */
  loading?: boolean;
  /** Expands the button to its container width. */
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({ variant = 'primary', loading = false, fullWidth = false, disabled, className = '', children, ...props }: ButtonProps) {
  const classes = [styles.button, styles[variant], fullWidth ? styles.fullWidth : '', loading ? styles.loading : '', className].filter(Boolean).join(' ');
  return <button className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>{loading ? 'Loading…' : children}</button>;
}
