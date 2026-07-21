import type {
  CSSProperties,
  ImgHTMLAttributes,
  ReactNode,
  TrackHTMLAttributes,
  VideoHTMLAttributes,
} from 'react';
import styles from './Media.module.css';

export interface ImageCredit {
  name: ReactNode;
  href?: string;
  source?: ReactNode;
  sourceHref?: string;
}

export type ImageAspectRatio = 'natural' | 'square' | 'portrait' | 'landscape' | 'wide';
export type ImageFit = 'cover' | 'contain';
export type ImageCaptionPlacement = 'below' | 'overlay-top-end';
export type ImageCreditPlacement = 'below' | 'overlay-top-end';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  /** Required. Use an empty string only when the image is decorative. */
  alt: string;
  /** Reader-facing context for the image. Captions are centered. */
  caption?: ReactNode;
  /** Authorship or source information. Credits are aligned to the inline end. */
  credit?: ImageCredit;
  /** Places metadata below the image or in a high-contrast panel at its top inline end. */
  captionPlacement?: ImageCaptionPlacement;
  /** Keeps the caption below while placing a compact credit at the image's top inline end. */
  creditPlacement?: ImageCreditPlacement;
  aspectRatio?: ImageAspectRatio;
  fit?: ImageFit;
  /** CSS object-position used when an aspect ratio crops the image. */
  position?: CSSProperties['objectPosition'];
}

export function Image({
  alt,
  caption,
  credit,
  captionPlacement = 'below',
  creditPlacement = 'below',
  aspectRatio = 'natural',
  fit = 'cover',
  position,
  className = '',
  loading = 'lazy',
  style,
  ...props
}: ImageProps) {
  const imageStyle = {
    ...style,
    ...(position ? { '--rvds-image-object-position': position } : {}),
  } as CSSProperties;
  const image = (
    <img
      className={[
        styles['rvds-image'],
        styles[`rvds-image--aspect-${aspectRatio}`],
        styles[`rvds-image--fit-${fit}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      alt={alt}
      loading={loading}
      style={imageStyle}
      {...props}
    />
  );
  if (!caption && !credit) return image;
  return (
    <figure
      className={[
        styles['rvds-image-figure'],
        styles[`rvds-image-figure--caption-${captionPlacement}`],
        styles[`rvds-image-figure--credit-${creditPlacement}`],
      ].join(' ')}
    >
      {image}
      <figcaption
        className={[
          styles['rvds-image-figure__caption'],
          caption && credit ? styles['rvds-image-figure__caption--with-credit'] : '',
          !caption && credit ? styles['rvds-image-figure__caption--credit-only'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {caption && <span className={styles['rvds-image-figure__description']}>{caption}</span>}
        {credit && (
          <span className={styles['rvds-image-figure__credit']}>
            {credit.href ? <a href={credit.href}>{credit.name}</a> : credit.name}
            {creditPlacement === 'below' && credit.source && (
              <>
                {' via '}
                {credit.sourceHref ? (
                  <a href={credit.sourceHref}>{credit.source}</a>
                ) : (
                  credit.source
                )}
              </>
            )}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export interface GalleryItem extends ImageProps {
  id?: string;
}
export interface GalleryProps {
  label: string;
  items: GalleryItem[];
  columns?: 2 | 3;
  className?: string;
}

export function Gallery({ label, items, columns = 2, className = '' }: GalleryProps) {
  return (
    <ul
      aria-label={label}
      className={[styles['rvds-gallery'], styles[`rvds-gallery--${columns}-columns`], className]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map(({ id, ...item }, index) => (
        <li className={styles['rvds-gallery__item']} key={id ?? `${item.src}-${index}`}>
          <Image {...item} />
        </li>
      ))}
    </ul>
  );
}

export interface VideoTrack extends TrackHTMLAttributes<HTMLTrackElement> {
  src: string;
}
export interface VideoEmbedProps extends Omit<
  VideoHTMLAttributes<HTMLVideoElement>,
  'title' | 'autoPlay' | 'controls' | 'preload'
> {
  title: string;
  caption?: ReactNode;
  tracks?: VideoTrack[];
}

export function VideoEmbed({
  title,
  caption,
  tracks = [],
  className = '',
  children,
  ...props
}: VideoEmbedProps) {
  const video = (
    <video
      aria-label={title}
      className={[styles['rvds-video'], className].filter(Boolean).join(' ')}
      controls
      preload="metadata"
      {...props}
    >
      {children}
      {tracks.map((track) => (
        <track key={`${track.kind}-${track.srcLang}-${track.src}`} {...track} />
      ))}
      Your browser does not support embedded video.
    </video>
  );
  if (!caption) return video;
  return (
    <figure className={styles['rvds-video-figure']}>
      {video}
      <figcaption className={styles['rvds-video-figure__caption']}>{caption}</figcaption>
    </figure>
  );
}
