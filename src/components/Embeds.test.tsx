import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GenericEmbed, InstagramEmbed, TiktokEmbed, YoutubeEmbed } from './Embeds';

describe('provider embeds', () => {
  it('renders a normal lazy-loaded Youtube player without autoplay', () => {
    render(<YoutubeEmbed startAt={12.9} title="Beyoncé – All Night" videoId="gM89Q5Eng_M" />);
    const player = screen.getByTitle('Beyoncé – All Night');
    expect(player).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/gM89Q5Eng_M?start=12',
    );
    expect(player).toHaveAttribute('loading', 'lazy');
    expect(player).toHaveAttribute('allowfullscreen');
    expect(player.getAttribute('src')).not.toContain('autoplay');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders lazy Instagram and Tiktok players with safe fallback links', () => {
    const { container } = render(
      <>
        <InstagramEmbed title="Instagram post" url="https://www.instagram.com/p/DESbLWOuM95/" />
        <TiktokEmbed
          title="Tiktok video"
          url="https://www.tiktok.com/@rvxmendoza/video/7368864505985617195"
        />
        <GenericEmbed title="Media kit" url="https://beacons.ai/rvxmendoza/mediakit" />
      </>,
    );
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelectorAll('iframe')).toHaveLength(2);
    expect(screen.getByTitle('Instagram post')).toHaveAttribute(
      'src',
      'https://www.instagram.com/p/DESbLWOuM95/embed/captioned/',
    );
    expect(screen.getByTitle('Tiktok video')).toHaveAttribute(
      'src',
      'https://www.tiktok.com/player/v1/7368864505985617195?description=1&music_info=1',
    );
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(screen.getByRole('link', { name: 'View on Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/p/DESbLWOuM95/',
    );
    expect(screen.getByRole('link', { name: 'View on Tiktok' })).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@rvxmendoza/video/7368864505985617195',
    );
    expect(screen.getByRole('link', { name: /Media kit/i })).toHaveAttribute(
      'href',
      'https://beacons.ai/rvxmendoza/mediakit',
    );
  });

  it('rejects unsafe URLs and malformed Youtube identifiers', () => {
    expect(() => render(<GenericEmbed title="Unsafe" url="javascript:alert(1)" />)).toThrow(
      'HTTP or HTTPS',
    );
    expect(() => render(<YoutubeEmbed title="Invalid" videoId="not-valid" />)).toThrow(
      '11-character',
    );
  });

  it('rejects malformed or cross-provider post URLs', () => {
    expect(() =>
      render(<InstagramEmbed title="Wrong provider" url="https://example.com/p/DESbLWOuM95/" />),
    ).toThrow('Instagram post URL');
    expect(() =>
      render(<TiktokEmbed title="Not a video" url="https://www.tiktok.com/@rvxmendoza" />),
    ).toThrow('Tiktok embeds require a video URL');
  });
});
