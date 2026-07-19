import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './Card';
import { Cluster, Container, Stack } from './Layout';
import { Link } from './Link';
import { SkipLink } from './SkipLink';

describe('RVDS public class names', () => {
  it('uses stable BEM blocks and modifiers for layout', () => {
    const { container } = render(
      <Container reading>
        <Stack>
          <Cluster>Content</Cluster>
        </Stack>
      </Container>,
    );
    expect(container.firstChild).toHaveClass('rvds-container', 'rvds-container--reading');
    expect(container.querySelector('.rvds-stack')).not.toBeNull();
    expect(container.querySelector('.rvds-cluster')).not.toBeNull();
  });

  it('uses stable classes for cards, links, and skip navigation', () => {
    const { container } = render(
      <>
        <Card>Card</Card>
        <Link href="#writing">Writing</Link>
        <Link variant="subtle" href="#work" fullWidth>
          Work
        </Link>
        <SkipLink />
      </>,
    );
    expect(container.querySelector('.rvds-card')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Writing' })).toHaveClass('rvds-link');
    expect(screen.getByRole('link', { name: 'Work' })).toHaveClass(
      'rvds-button',
      'rvds-button--subtle',
      'rvds-button--full-width',
    );
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveClass(
      'rvds-skip-link',
    );
  });
});
