import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Prose.module.css';

export interface ProseProps extends HTMLAttributes<HTMLElement> {
  as?: 'article' | 'div' | 'section';
  measure?: 'reading' | 'wide';
  children: ReactNode;
}

export function Prose({
  as: Element = 'div',
  measure = 'reading',
  className = '',
  children,
  ...props
}: ProseProps) {
  return (
    <Element
      className={[styles['rvds-prose'], styles[`rvds-prose--${measure}`], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Element>
  );
}
