import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> { reading?: boolean; children: ReactNode; }
export function Container({ reading = false, className = '', children, ...props }: ContainerProps) {
  return <div className={[styles.container, reading ? styles.reading : '', className].filter(Boolean).join(' ')} {...props}>{children}</div>;
}

type Space = 'var(--space-2)' | 'var(--space-3)' | 'var(--space-4)' | 'var(--space-5)' | 'var(--space-6)' | 'var(--space-7)';
export interface StackProps extends HTMLAttributes<HTMLDivElement> { space?: Space; children: ReactNode; }
export function Stack({ space = 'var(--space-5)', style, children, ...props }: StackProps) {
  return <div className={styles.stack} style={{ '--stack-space': space, ...style } as CSSProperties} {...props}>{children}</div>;
}
export interface ClusterProps extends HTMLAttributes<HTMLDivElement> { space?: Space; justify?: CSSProperties['justifyContent']; align?: CSSProperties['alignItems']; children: ReactNode; }
export function Cluster({ space = 'var(--space-4)', justify = 'flex-start', align = 'center', style, children, ...props }: ClusterProps) {
  return <div className={styles.cluster} style={{ '--cluster-space': space, '--cluster-justify': justify, '--cluster-align': align, ...style } as CSSProperties} {...props}>{children}</div>;
}
