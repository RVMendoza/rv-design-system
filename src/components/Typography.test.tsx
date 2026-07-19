import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CodeBlock, Divider, Heading, Paragraph, Quote } from './Typography';

describe('blog typography', () => {
  it('keeps heading semantics independent from visual size', () => {
    render(
      <Heading level={3} size={1}>
        A section heading
      </Heading>,
    );
    expect(screen.getByRole('heading', { level: 3 })).toHaveClass(
      'rvds-heading',
      'rvds-heading--1',
    );
  });

  it('renders paragraphs, quotes, code, and dividers semantically', () => {
    const { container } = render(
      <>
        <Paragraph size="lead">Introduction</Paragraph>
        <Quote attribution="A writer" citationUrl="https://example.com/source">
          A useful observation.
        </Quote>
        <CodeBlock code={'const answer = 42;'} language="ts" caption="Example" />
        <Divider />
      </>,
    );
    expect(screen.getByText('Introduction').tagName).toBe('P');
    expect(container.querySelector('blockquote[cite="https://example.com/source"]')).not.toBeNull();
    expect(container.querySelector('pre code[data-language="ts"]')).toHaveTextContent(
      'const answer = 42;',
    );
    expect(container.querySelector('hr.rvds-divider')).not.toBeNull();
  });
});
