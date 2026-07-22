import type { HTMLAttributes, ImgHTMLAttributes, OlHTMLAttributes, ReactNode } from 'react';
import { Link } from './Link';
import { Heading, Paragraph } from './Typography';
import { Icon } from './Icon';
import styles from './Articles.module.css';

export interface ArticleListProps extends OlHTMLAttributes<HTMLOListElement> {
  children: ReactNode;
  /** Visual arrangement for the collection. Native ordered-list semantics are preserved. */
  layout?: 'rows' | 'grid';
  /** Controls visual density without changing list or article semantics. */
  density?: 'comfortable' | 'compact';
  /** Aligns row preview content with the collection edge or keeps the default editorial inset. */
  contentAlignment?: 'inset' | 'flush';
}

/** An ordered collection of article previews. */
export function ArticleList({
  className = '',
  children,
  layout = 'rows',
  density = 'compact',
  contentAlignment = 'inset',
  ...props
}: ArticleListProps) {
  return (
    <ol
      className={[
        styles['rvds-article-list'],
        styles[`rvds-article-list--${layout}`],
        styles[`rvds-article-list--${density}`],
        styles[`rvds-article-list--${contentAlignment}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </ol>
  );
}

export type ArticlePreviewImage = Pick<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> & {
  src: string;
  alt: string;
};

export interface ArticlePreviewProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  href: string;
  title: ReactNode;
  description?: ReactNode;
  /** Short contextual label displayed before the title. */
  eyebrow?: ReactNode;
  image?: ArticlePreviewImage;
  /** Decorative marker. Invalid runtime values safely use the default spark. */
  markerIcon?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

/** A linked editorial preview that may include an authored image. */
export function ArticlePreview({
  href,
  title,
  description,
  eyebrow,
  image,
  markerIcon = 'sparkles',
  headingLevel = 2,
  className = '',
  ...props
}: ArticlePreviewProps) {
  return (
    <article
      className={[
        styles['rvds-article-preview'],
        !image ? styles['rvds-article-preview--text-only'] : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <a className={styles['rvds-article-preview__link']} href={href}>
        {image && (
          <span className={styles['rvds-article-preview__media']}>
            <img className={styles['rvds-article-preview__image']} loading="lazy" {...image} />
          </span>
        )}
        <span className={styles['rvds-article-preview__content']}>
          <span
            className={[
              styles['rvds-article-preview__marker'],
              styles['rvds-article-preview__marker--icon'],
            ].join(' ')}
            aria-hidden="true"
          >
            <Icon name={markerIcon} />
          </span>
          {eyebrow && <span className={styles['rvds-article-preview__eyebrow']}>{eyebrow}</span>}
          <Heading className={styles['rvds-article-preview__title']} level={headingLevel} size={3}>
            {title}
          </Heading>
          {description && (
            <Paragraph className={styles['rvds-article-preview__description']}>
              {description}
            </Paragraph>
          )}
        </span>
        <span className={styles['rvds-article-preview__arrow']} aria-hidden="true">
          ↗
        </span>
      </a>
    </article>
  );
}

export interface ArticleHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: ReactNode;
}

/** A long-form article heading with optional collection navigation. */
export function ArticleHeader({
  title,
  description,
  backHref,
  backLabel = 'Back to writing',
  className = '',
  ...props
}: ArticleHeaderProps) {
  return (
    <header
      className={[styles['rvds-article-header'], className].filter(Boolean).join(' ')}
      {...props}
    >
      {backHref && (
        <nav className={styles['rvds-article-header__navigation']} aria-label="Article">
          <Link href={backHref}>← {backLabel}</Link>
        </nav>
      )}
      <Heading className={styles['rvds-article-header__title']} level={1}>
        {title}
      </Heading>
      {description && (
        <Paragraph className={styles['rvds-article-header__description']} size="lead">
          {description}
        </Paragraph>
      )}
    </header>
  );
}
