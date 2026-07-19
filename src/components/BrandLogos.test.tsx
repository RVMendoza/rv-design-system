import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandLogo, BrandLogoList } from './BrandLogos';

describe('brand logos', () => {
  it('renders a semantic list and an accessible linked logo', () => {
    const { container } = render(
      <BrandLogoList aria-label="Brands RV has worked with">
        <li>
          <BrandLogo name="Example Brand" href="https://example.com" logo={{ src: '/brand.svg' }} />
        </li>
      </BrandLogoList>,
    );

    expect(screen.getByRole('list', { name: 'Brands RV has worked with' }).tagName).toBe('UL');
    expect(screen.getByRole('link', { name: 'Example Brand' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
    expect(container.querySelector('.rvds-brand-logo-list')).not.toBeNull();
    expect(container.querySelector('.rvds-brand-logo__image')).toHaveAttribute('alt', '');
  });

  it('shows a stable text fallback when no artwork is available', () => {
    const { container } = render(<BrandLogo name="Text Brand" />);

    expect(
      screen.getByText('Text Brand', { selector: '.rvds-brand-logo__fallback' }),
    ).toBeVisible();
    expect(container.querySelector('.rvds-brand-logo--text-only')).not.toBeNull();
    expect(container.querySelector('.rvds-brand-logo')).toHaveAttribute('title', 'Text Brand');
    expect(container.querySelector('img')).toBeNull();
  });
});
