import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';
export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'section' | 'div';
  children: ReactNode;
}
export function Card({ as: Element = 'article', className = '', children, ...props }: CardProps) {
  return (
    <Element className={[styles['rvds-card'], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </Element>
  );
}
