import type { ImgHTMLAttributes, ReactNode, TrackHTMLAttributes, VideoHTMLAttributes } from 'react';
import styles from './Media.module.css';

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  /** Required. Use an empty string only when the image is decorative. */
  alt: string;
  caption?: ReactNode;
}

export function Image({ alt, caption, className = '', loading = 'lazy', ...props }: ImageProps) {
  const image = (
    <img
      className={[styles['rvds-image'], className].filter(Boolean).join(' ')}
      alt={alt}
      loading={loading}
      {...props}
    />
  );
  if (!caption) return image;
  return (
    <figure className={styles['rvds-image-figure']}>
      {image}
      <figcaption className={styles['rvds-image-figure__caption']}>{caption}</figcaption>
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
