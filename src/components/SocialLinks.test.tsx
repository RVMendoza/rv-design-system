import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SocialLinks } from './SocialLinks';

describe('SocialLinks', () => {
  it('renders a labeled list of logo links with stable BEM classes', () => {
    const { container } = render(
      <SocialLinks
        links={[
          { provider: 'instagram', label: 'Instagram', href: 'https://instagram.com/example' },
          { provider: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/example' },
        ]}
      />,
    );

    expect(screen.getByRole('list', { name: 'Social profiles' })).toHaveClass('rvds-social-links');
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'data-provider',
      'instagram',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/example',
    );
    expect(container.querySelectorAll('.rvds-social-links__icon')).toHaveLength(2);
    expect(container.querySelectorAll('.rvds-social-links__icon path')).toHaveLength(2);
    expect(container.querySelector('text')).toBeNull();
  });

  it('uses the generic icon without changing the authored accessible name', () => {
    render(
      <SocialLinks
        links={[{ provider: 'generic', label: 'Community profile', href: 'https://example.com' }]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Community profile' })).toHaveAttribute(
      'data-provider',
      'generic',
    );
  });

  it('shows a visible label and supports the Snapchat brand icon when requested', () => {
    const { container } = render(
      <SocialLinks
        showLabels
        links={[
          {
            provider: 'snapchat',
            label: 'Snapchat: 10K followers',
            href: 'https://snapchat.com/add/example',
          },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Snapchat: 10K followers' })).toHaveAttribute(
      'data-provider',
      'snapchat',
    );
    expect(screen.getByText('Snapchat: 10K followers')).toBeVisible();
    expect(container.querySelector('.rvds-social-links--labels')).not.toBeNull();
  });

  it('uses an explicit accessible name when a compact visible label is supplied', () => {
    render(
      <SocialLinks
        showLabels
        links={[
          {
            provider: 'instagram',
            label: 'Instagram · 246.4K',
            ariaLabel: 'Instagram: 246.4K followers',
            href: 'https://instagram.com/example',
          },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Instagram: 246.4K followers' })).toBeVisible();
    expect(screen.getByText('Instagram · 246.4K')).toBeVisible();
  });
});
