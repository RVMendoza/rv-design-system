import { useState, type ReactNode } from 'react';
import styles from './Embeds.module.css';

export interface GenericEmbedProps {
  url: string;
  title: string;
  description?: ReactNode;
  provider?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  className?: string;
}

function safeExternalUrl(url: string) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') throw new TypeError('Embed URLs must use HTTP or HTTPS.');
  return parsed.toString();
}

export function GenericEmbed({ url, title, description, provider, thumbnail, thumbnailAlt = '', className = '' }: GenericEmbedProps) {
  const href = safeExternalUrl(url);
  return <a className={[styles['rvds-generic-embed'], className].filter(Boolean).join(' ')} href={href} rel="noopener noreferrer" target="_blank">
    {thumbnail && <img alt={thumbnailAlt} className={styles['rvds-generic-embed__thumbnail']} loading="lazy" src={thumbnail} />}
    <span className={styles['rvds-generic-embed__content']}>
      {provider && <span className={styles['rvds-generic-embed__provider']}>{provider}</span>}
      <span className={styles['rvds-generic-embed__title']}>{title}</span>
      {description && <span className={styles['rvds-generic-embed__description']}>{description}</span>}
      <span className={styles['rvds-generic-embed__url']}>{url}</span>
    </span>
  </a>;
}

export type ProviderEmbedProps = Omit<GenericEmbedProps, 'provider'>;
export function InstagramEmbed(props: ProviderEmbedProps) { return <GenericEmbed provider="Instagram" {...props} />; }
export function TikTokEmbed(props: ProviderEmbedProps) { return <GenericEmbed provider="TikTok" {...props} />; }

export interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  poster?: string;
  posterAlt?: string;
  caption?: ReactNode;
  startAt?: number;
  className?: string;
}

export function YouTubeEmbed({ videoId, title, poster, posterAlt = '', caption, startAt = 0, className = '' }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) throw new TypeError('YouTube videoId must be an 11-character video identifier.');
  const safeStart = Number.isFinite(startAt) && startAt > 0 ? Math.floor(startAt) : 0;
  const source = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1${safeStart > 0 ? `&start=${safeStart}` : ''}`;
  return <figure className={[styles['rvds-youtube-embed'], className].filter(Boolean).join(' ')}>
    <div className={styles['rvds-youtube-embed__frame']}>
      {active ? <iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className={styles['rvds-youtube-embed__iframe']} referrerPolicy="strict-origin-when-cross-origin" src={source} title={title} /> : <button className={styles['rvds-youtube-embed__consent']} onClick={() => setActive(true)} type="button">
        {poster && <img alt={posterAlt} className={styles['rvds-youtube-embed__poster']} src={poster} />}
        <span className={styles['rvds-youtube-embed__action']}>Play video</span>
        <span className={styles['rvds-youtube-embed__notice']}>Loads YouTube after activation</span>
      </button>}
    </div>
    {caption && <figcaption className={styles['rvds-youtube-embed__caption']}>{caption}</figcaption>}
  </figure>;
}
