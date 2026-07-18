import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { GenericEmbed, InstagramEmbed, TikTokEmbed, YouTubeEmbed } from './Embeds';

describe('privacy-first embeds', () => {
  it('does not load YouTube until keyboard activation', async () => {
    const user = userEvent.setup();
    const { container } = render(<YouTubeEmbed title="A useful video" videoId="abcdefghijk" />);
    expect(container.querySelector('iframe')).toBeNull();
    const button = screen.getByRole('button', { name: /play video/i });
    await user.tab();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByTitle('A useful video')).toHaveAttribute('src', expect.stringContaining('youtube-nocookie.com/embed/abcdefghijk'));
  });

  it('renders provider previews as safe links without scripts or frames', () => {
    const { container } = render(<><InstagramEmbed title="Photo post" url="https://instagram.com/p/example" /><TikTokEmbed title="Short video" url="https://tiktok.com/@example/video/1" /><GenericEmbed title="Related article" url="https://example.com/article" /></>);
    expect(container.querySelector('script, iframe')).toBeNull();
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('rejects unsafe URLs and malformed YouTube identifiers', () => {
    expect(() => render(<GenericEmbed title="Unsafe" url="javascript:alert(1)" />)).toThrow('HTTP or HTTPS');
    expect(() => render(<YouTubeEmbed title="Invalid" videoId="not-valid" />)).toThrow('11-character');
  });
});
