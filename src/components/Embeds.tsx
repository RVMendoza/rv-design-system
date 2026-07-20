import type { ReactNode } from 'react';
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
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')
    throw new TypeError('Embed URLs must use HTTP or HTTPS.');
  return parsed.toString();
}

export function GenericEmbed({
  url,
  title,
  description,
  provider,
  thumbnail,
  thumbnailAlt = '',
  className = '',
}: GenericEmbedProps) {
  const href = safeExternalUrl(url);
  return (
    <a
      className={[styles['rvds-generic-embed'], className].filter(Boolean).join(' ')}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {thumbnail && (
        <img
          alt={thumbnailAlt}
          className={styles['rvds-generic-embed__thumbnail']}
          loading="lazy"
          src={thumbnail}
        />
      )}
      <span className={styles['rvds-generic-embed__content']}>
        {provider && <span className={styles['rvds-generic-embed__provider']}>{provider}</span>}
        <span className={styles['rvds-generic-embed__title']}>{title}</span>
        {description && (
          <span className={styles['rvds-generic-embed__description']}>{description}</span>
        )}
        <span className={styles['rvds-generic-embed__url']}>{url}</span>
      </span>
    </a>
  );
}

export type ProviderEmbedProps = Omit<GenericEmbedProps, 'provider'>;

function providerPost(url: string, provider: 'Instagram' | 'Tiktok') {
  const parsed = new URL(safeExternalUrl(url));
  if (provider === 'Instagram') {
    if (!/(^|\.)instagram\.com$/.test(parsed.hostname))
      throw new TypeError('Instagram embeds require an Instagram post URL.');
    const match = parsed.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);
    if (!match) throw new TypeError('Instagram embeds require a post, reel, or video URL.');
    return `https://www.instagram.com/${match[1]}/${match[2]}/embed/captioned/`;
  }

  if (!/(^|\.)tiktok\.com$/.test(parsed.hostname))
    throw new TypeError('Tiktok embeds require a Tiktok video URL.');
  const match = parsed.pathname.match(/^\/@[^/]+\/video\/(\d+)\/?$/);
  if (!match) throw new TypeError('Tiktok embeds require a video URL.');
  return `https://www.tiktok.com/player/v1/${match[1]}?description=1&music_info=1`;
}

function ProviderEmbed({
  provider,
  url,
  title,
  description,
  className = '',
}: ProviderEmbedProps & { provider: 'Instagram' | 'Tiktok' }) {
  const href = safeExternalUrl(url);
  const source = providerPost(url, provider);
  const providerClass = provider.toLowerCase();
  return (
    <figure
      className={[
        styles['rvds-provider-embed'],
        styles[`rvds-provider-embed--${providerClass}`],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <iframe
        allow="encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className={styles['rvds-provider-embed__iframe']}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={source}
        title={title}
      />
      <figcaption className={styles['rvds-provider-embed__caption']}>
        {description && (
          <span className={styles['rvds-provider-embed__description']}>{description}</span>
        )}
        <a href={href} rel="noopener noreferrer" target="_blank">
          View on {provider}
        </a>
      </figcaption>
    </figure>
  );
}

export function InstagramEmbed(props: ProviderEmbedProps) {
  return <ProviderEmbed provider="Instagram" {...props} />;
}
export function TiktokEmbed(props: ProviderEmbedProps) {
  return <ProviderEmbed provider="Tiktok" {...props} />;
}

export interface YoutubeEmbedProps {
  videoId: string;
  title: string;
  caption?: ReactNode;
  startAt?: number;
  className?: string;
}

export function YoutubeEmbed({
  videoId,
  title,
  caption,
  startAt = 0,
  className = '',
}: YoutubeEmbedProps) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId))
    throw new TypeError('Youtube videoId must be an 11-character video identifier.');
  const safeStart = Number.isFinite(startAt) && startAt > 0 ? Math.floor(startAt) : 0;
  const source = `https://www.youtube-nocookie.com/embed/${videoId}${safeStart > 0 ? `?start=${safeStart}` : ''}`;
  return (
    <figure className={[styles['rvds-youtube-embed'], className].filter(Boolean).join(' ')}>
      <div className={styles['rvds-youtube-embed__frame']}>
        <iframe
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles['rvds-youtube-embed__iframe']}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={source}
          title={title}
        />
      </div>
      {caption && (
        <figcaption className={styles['rvds-youtube-embed__caption']}>{caption}</figcaption>
      )}
    </figure>
  );
}
