import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ArticleHeader, ArticleList, ArticlePreview } from './Articles';

describe('article components', () => {
  it('renders an ordered list with a linked, lazy-loaded image preview', () => {
    const { container } = render(
      <ArticleList aria-label="Writing">
        <li>
          <ArticlePreview
            href="/writing/clarity/"
            title="Clarity in practice"
            description="A useful description for the article."
            image={{
              src: '/article.jpg',
              alt: 'A notebook open on a desk.',
              width: 1200,
              height: 900,
            }}
          />
        </li>
      </ArticleList>,
    );

    expect(screen.getByRole('list', { name: 'Writing' }).tagName).toBe('OL');
    expect(container.querySelector('ol > li > article')).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Clarity in practice' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Clarity in practice/ })).toHaveAttribute(
      'href',
      '/writing/clarity/',
    );
    expect(screen.getByRole('img', { name: 'A notebook open on a desk.' })).toHaveAttribute(
      'loading',
      'lazy',
    );
    expect(container.querySelector('.rvds-article-list')).not.toBeNull();
    expect(container.querySelector('.rvds-article-preview')).not.toBeNull();
    expect(container.querySelector('.rvds-article-preview__image')).not.toBeNull();
    expect(container.querySelector('.rvds-article-preview__marker--icon')).not.toBeNull();
    expect(
      container.querySelector('.rvds-article-preview__content > .rvds-article-preview__marker'),
    ).not.toBeNull();
    expect(container.querySelector('.rvds-article-preview__marker svg')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('renders a stable text-only modifier without an empty image', () => {
    const { container } = render(
      <ArticlePreview href="/writing/text-only/" title="A text-only article" />,
    );

    expect(container.querySelector('.rvds-article-preview--text-only')).not.toBeNull();
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('.rvds-article-preview__marker')).not.toBeNull();
  });

  it('renders named decorative markers through the shared icon system', () => {
    const { container, rerender } = render(
      <ArticlePreview href="/writing/icons/" markerIcon="camera" title="An icon article" />,
    );
    expect(container.querySelector('.rvds-article-preview__marker svg')).not.toBeNull();

    rerender(
      <ArticlePreview href="/writing/icons/" markerIcon="not-an-icon" title="An icon article" />,
    );
    expect(container.querySelectorAll('.rvds-article-preview__marker svg')).toHaveLength(1);
  });

  it('renders an ordered grid with an optional eyebrow', () => {
    const { container } = render(
      <ArticleList layout="grid" aria-label="Featured writing">
        <li>
          <ArticlePreview href="/writing/ideas/" title="Ideas in practice" eyebrow="Work" />
        </li>
      </ArticleList>,
    );

    expect(screen.getByRole('list', { name: 'Featured writing' }).tagName).toBe('OL');
    expect(container.querySelector('.rvds-article-list--grid')).not.toBeNull();
    expect(container.querySelector('.rvds-article-list--compact')).not.toBeNull();
    expect(container.querySelector('.rvds-article-preview__eyebrow')).toHaveTextContent('Work');
  });

  it('renders the opt-in compact density without changing article semantics', () => {
    const { container } = render(
      <ArticleList layout="grid" density="compact" aria-label="Compact writing">
        <li>
          <ArticlePreview
            href="/writing/compact/"
            title="A compact article"
            description="The complete authored description remains in the document."
          />
        </li>
      </ArticleList>,
    );

    expect(screen.getByRole('list', { name: 'Compact writing' }).tagName).toBe('OL');
    expect(container.querySelector('ol > li > article')).not.toBeNull();
    expect(container.querySelector('.rvds-article-list--compact')).not.toBeNull();
    expect(
      screen.getByText('The complete authored description remains in the document.'),
    ).toBeInTheDocument();
  });

  it('renders flush row alignment without changing list semantics', () => {
    const { container } = render(
      <ArticleList contentAlignment="flush" aria-label="Aligned writing">
        <li>
          <ArticlePreview href="/writing/aligned/" title="An edge-aligned article" />
        </li>
      </ArticleList>,
    );

    expect(screen.getByRole('list', { name: 'Aligned writing' }).tagName).toBe('OL');
    expect(container.querySelector('ol > li > article')).not.toBeNull();
    expect(container.querySelector('.rvds-article-list--rows')).not.toBeNull();
    expect(container.querySelector('.rvds-article-list--flush')).not.toBeNull();
  });

  it('renders an article heading and labeled collection navigation', () => {
    const { container } = render(
      <ArticleHeader
        backHref="/writing/"
        backLabel="All writing"
        title="A durable article title"
        description="An authored introduction to the article."
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Article' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '← All writing' })).toHaveAttribute(
      'href',
      '/writing/',
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A durable article title');
    expect(container.querySelector('.rvds-article-header')).not.toBeNull();
  });
});
