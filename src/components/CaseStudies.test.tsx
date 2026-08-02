import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeatureSteps, MetricGrid, ProjectPreview, QuoteRail } from './CaseStudies';

describe('case-study components', () => {
  it('renders a brand-first linked project preview', () => {
    render(
      <ProjectPreview
        brandName="Example"
        href="/work/example/"
        meta="Paid partnership · Q2 2026"
        outcome="Made a complex product useful"
        roleLabel="Content creator"
      />,
    );
    const link = screen.getByRole('link', { name: /Example.*Made a complex product useful/i });
    expect(link).toHaveAttribute('href', '/work/example/');
    expect(screen.getByText('View case study')).toBeVisible();
  });

  it('uses an orientation-aware frame for supporting campaign media', () => {
    const { container } = render(
      <ProjectPreview
        brandName="Example"
        href="/work/example/"
        image={{
          alt: 'A creator holds a product in a vertical campaign frame.',
          height: 1200,
          src: '/portrait.jpg',
          width: 800,
        }}
        outcome="Made the product part of the story"
      />,
    );
    expect(container.querySelector('.rvds-project-preview__media--portrait')).not.toBeNull();
  });

  it('renders metrics as a definition list', () => {
    const { container } = render(
      <MetricGrid items={[{ label: 'Accounts reached', value: '130K+' }]} />,
    );
    expect(container.querySelector('dl')).not.toBeNull();
    expect(screen.getByText('Accounts reached').tagName).toBe('DT');
    expect(screen.getByText('130K+').tagName).toBe('DD');
  });

  it('renders ordered feature steps with resolved icons', () => {
    render(
      <FeatureSteps
        items={[
          {
            description: 'A useful description.',
            icon: 'target',
            label: 'The brief',
            title: 'Make the product useful',
          },
        ]}
      />,
    );
    expect(screen.getByRole('list')).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Make the product useful' })).toBeVisible();
    expect(screen.getByText('01')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a keyboard-scrollable equal-card quote rail', () => {
    const items = [
      { attribution: '@reader', quote: 'This made the idea click.' },
      { attribution: '@viewer', quote: 'I want to see what happens next.' },
      { attribution: '@creator', quote: 'The real example made this useful.' },
    ];

    render(<QuoteRail items={items} label="Audience comments" />);
    const region = screen.getByRole('region', { name: 'Audience comments' });
    expect(region).toHaveAttribute('tabindex', '0');
    expect(region.querySelectorAll('blockquote')).toHaveLength(items.length);
    expect(screen.getByText('@reader')).toBeVisible();
    expect(screen.getByText('@creator')).toBeVisible();
  });
});
