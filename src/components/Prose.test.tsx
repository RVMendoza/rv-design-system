import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Prose } from './Prose';

describe('Prose', () => {
  it('renders native article content with stable BEM classes', () => {
    render(
      <Prose as="article">
        <h2>A native heading</h2>
        <p>Markdown-equivalent prose.</p>
        <figure>
          <img alt="A useful diagram" src="/diagram.png" />
          <figcaption>A centered explanation.</figcaption>
        </figure>
        <figure>
          <img alt="A credited photograph" src="/photograph.jpg" />
          <figcaption className="rvds-prose__credit">Photo: Example Photographer</figcaption>
        </figure>
        <figure className="rvds-prose__figure">
          <img alt="An economic impact chart" src="/chart.jpg" />
          <figcaption className="rvds-prose__media-caption rvds-prose__media-caption--with-credit">
            <span className="rvds-prose__caption-text">A centered chart explanation.</span>
            <span className="rvds-prose__credit">
              <a href="https://example.com">Source</a>
            </span>
          </figcaption>
        </figure>
      </Prose>,
    );

    const article = screen.getByRole('article');
    expect(article).toHaveClass('rvds-prose', 'rvds-prose--reading');
    expect(screen.getByRole('heading', { name: 'A native heading' })).toBeInTheDocument();
    expect(screen.getByText('A centered explanation.').closest('figure')).not.toBeNull();
    expect(screen.getByText('Photo: Example Photographer')).toHaveClass('rvds-prose__credit');
    expect(screen.getByText('Source').closest('.rvds-prose__credit')).not.toBeNull();
  });

  it('supports a wide measure without changing semantics', () => {
    render(
      <Prose as="section" aria-label="Full article media" measure="wide">
        <p>Wide content.</p>
      </Prose>,
    );
    expect(screen.getByRole('region', { name: 'Full article media' })).toHaveClass(
      'rvds-prose--wide',
    );
  });
});
