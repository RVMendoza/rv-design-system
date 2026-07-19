import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  reading?: boolean;
  children: ReactNode;
}
export function Container({ reading = false, className = '', children, ...props }: ContainerProps) {
  return (
    <div
      className={[
        styles['rvds-container'],
        reading ? styles['rvds-container--reading'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

type Space =
  | 'var(--rvds-space-2)'
  | 'var(--rvds-space-3)'
  | 'var(--rvds-space-4)'
  | 'var(--rvds-space-5)'
  | 'var(--rvds-space-6)'
  | 'var(--rvds-space-7)';
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  space?: Space;
  children: ReactNode;
}
export function Stack({ space = 'var(--rvds-space-5)', style, children, ...props }: StackProps) {
  return (
    <div
      className={styles['rvds-stack']}
      style={{ '--rvds-stack-space': space, ...style } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
export interface ClusterProps extends HTMLAttributes<HTMLDivElement> {
  space?: Space;
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  children: ReactNode;
}
export function Cluster({
  space = 'var(--rvds-space-4)',
  justify = 'flex-start',
  align = 'center',
  style,
  children,
  ...props
}: ClusterProps) {
  return (
    <div
      className={styles['rvds-cluster']}
      style={
        {
          '--rvds-cluster-space': space,
          '--rvds-cluster-justify': justify,
          '--rvds-cluster-align': align,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
