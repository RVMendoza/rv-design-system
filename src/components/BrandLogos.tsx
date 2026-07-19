import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import styles from './BrandLogos.module.css';

export interface BrandLogoProps extends HTMLAttributes<HTMLElement> {
  name: string;
  logo?: Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'>;
  href?: string;
}

/** A collaborator identity with an accessible text fallback and optional link. */
export function BrandLogo({
  name,
  logo,
  href,
  className = '',
  title = name,
  ...props
}: BrandLogoProps) {
  const content = (
    <>
      {logo ? (
        <img className={styles['rvds-brand-logo__image']} alt="" loading="lazy" {...logo} />
      ) : (
        <span className={styles['rvds-brand-logo__fallback']} aria-hidden="true">
          {name}
        </span>
      )}
      <span className={styles['rvds-brand-logo__name']}>{name}</span>
    </>
  );

  return (
    <article
      className={[
        styles['rvds-brand-logo'],
        !logo ? styles['rvds-brand-logo--text-only'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      title={title}
      {...props}
    >
      {href ? (
        <a className={styles['rvds-brand-logo__link']} href={href}>
          {content}
        </a>
      ) : (
        <div className={styles['rvds-brand-logo__content']}>{content}</div>
      )}
    </article>
  );
}

export interface BrandLogoListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

/** A static, responsive collection of collaborator identities. */
export function BrandLogoList({ children, className = '', ...props }: BrandLogoListProps) {
  return (
    <ul
      className={[styles['rvds-brand-logo-list'], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </ul>
  );
}
