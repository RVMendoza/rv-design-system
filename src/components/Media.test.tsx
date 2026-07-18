import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Gallery, Image, VideoEmbed } from './Media';

describe('blog media', () => {
  it('associates image and video captions through figure semantics', () => {
    const { container } = render(<><Image alt="A bowl on a table" caption="Dinner." height={600} src="/bowl.jpg" width={800} /><VideoEmbed title="Recipe demonstration" caption="Step by step." src="/recipe.mp4" tracks={[{ kind: 'captions', src: '/captions.vtt', srcLang: 'en', label: 'English' }]} /></>);
    expect(screen.getByRole('img', { name: 'A bowl on a table' }).closest('figure')).not.toBeNull();
    expect(screen.getByLabelText('Recipe demonstration')).toHaveAttribute('controls');
    expect(container.querySelector('track[kind="captions"]')).not.toBeNull();
  });

  it('renders a labeled gallery as a semantic list', () => {
    render(<Gallery label="Trip photographs" items={[{ src: '/one.jpg', alt: 'A street' }, { src: '/two.jpg', alt: 'A market' }]} />);
    expect(screen.getByRole('list', { name: 'Trip photographs' })).toHaveClass('rvds-gallery', 'rvds-gallery--2-columns');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
