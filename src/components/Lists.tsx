import type { HTMLAttributes, OlHTMLAttributes, ReactNode } from 'react';
import styles from './Lists.module.css';

export interface BulletedListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}
export function BulletedList({ className = '', children, ...props }: BulletedListProps) {
  return (
    <ul className={[styles['rvds-bulleted-list'], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </ul>
  );
}

export interface NumberedListProps extends OlHTMLAttributes<HTMLOListElement> {
  children: ReactNode;
}
export function NumberedList({ className = '', children, ...props }: NumberedListProps) {
  return (
    <ol className={[styles['rvds-numbered-list'], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </ol>
  );
}
