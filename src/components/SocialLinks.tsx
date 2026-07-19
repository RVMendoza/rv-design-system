import type { HTMLAttributes } from 'react';
import {
  siBluesky,
  siFacebook,
  siInstagram,
  siMastodon,
  siPinterest,
  siSubstack,
  siThreads,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
} from 'simple-icons';
import styles from './SocialLinks.module.css';

export type SocialProvider =
  | 'instagram'
  | 'tiktok'
  | 'youtube'
  | 'linkedin'
  | 'threads'
  | 'substack'
  | 'facebook'
  | 'x'
  | 'bluesky'
  | 'pinterest'
  | 'twitch'
  | 'mastodon'
  | 'generic';

export interface SocialLinkItem {
  provider: SocialProvider;
  label: string;
  href: string;
}

export interface SocialLinksProps extends Omit<HTMLAttributes<HTMLUListElement>, 'children'> {
  links: SocialLinkItem[];
  label?: string;
}

function SocialIcon({ provider }: { provider: SocialProvider }) {
  const common = {
    'aria-hidden': true,
    className: styles['rvds-social-links__icon'],
    focusable: false,
    viewBox: '0 0 24 24',
  } as const;

  const officialPaths: Partial<Record<SocialProvider, string>> = {
    instagram: siInstagram.path,
    tiktok: siTiktok.path,
    youtube: siYoutube.path,
    threads: siThreads.path,
    substack: siSubstack.path,
    facebook: siFacebook.path,
    x: siX.path,
    bluesky: siBluesky.path,
    pinterest: siPinterest.path,
    twitch: siTwitch.path,
    mastodon: siMastodon.path,
    linkedin:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM6.813 20.452H3.861V9h2.952v11.452Z',
  };
  const path = officialPaths[provider];
  if (path) {
    return (
      <svg
        {...common}
        className={`${common.className} ${styles['rvds-social-links__icon--brand']}`}
      >
        <path d={path} />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="m9.5 14.5 5-5M7.2 16.8l-1 .95a3.25 3.25 0 0 1-4.6-4.6l3.1-3.1a3.25 3.25 0 0 1 4.6 0M16.8 7.2l1-.95a3.25 3.25 0 1 1 4.6 4.6l-3.1 3.1a3.25 3.25 0 0 1-4.6 0" />
    </svg>
  );
}

/** A wrapping list of accessible social-profile logo links. */
export function SocialLinks({
  links,
  label = 'Social profiles',
  className = '',
  ...props
}: SocialLinksProps) {
  return (
    <ul
      aria-label={label}
      className={[styles['rvds-social-links'], className].filter(Boolean).join(' ')}
      {...props}
    >
      {links.map((link) => (
        <li className={styles['rvds-social-links__item']} key={`${link.provider}-${link.href}`}>
          <a
            aria-label={link.label}
            className={styles['rvds-social-links__link']}
            data-provider={link.provider}
            href={link.href}
          >
            <SocialIcon provider={link.provider} />
            <span className={styles['rvds-social-links__label']}>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
