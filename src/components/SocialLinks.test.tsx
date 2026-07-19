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
});
