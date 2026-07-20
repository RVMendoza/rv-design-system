import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Gallery, Image, VideoEmbed } from './Media';

describe('blog media', () => {
  it('associates image and video captions through figure semantics', () => {
    const { container } = render(
      <>
        <Image alt="A bowl on a table" caption="Dinner." height={600} src="/bowl.jpg" width={800} />
        <VideoEmbed
          title="Recipe demonstration"
          caption="Step by step."
          src="/recipe.mp4"
          tracks={[{ kind: 'captions', src: '/captions.vtt', srcLang: 'en', label: 'English' }]}
        />
      </>,
    );
    expect(screen.getByRole('img', { name: 'A bowl on a table' }).closest('figure')).not.toBeNull();
    expect(screen.getByLabelText('Recipe demonstration')).toHaveAttribute('controls');
    expect(container.querySelector('track[kind="captions"]')).not.toBeNull();
  });

  it('renders centered caption and structured photo credit hooks', () => {
    render(
      <Image
        alt="RV speaking on a panel"
        aspectRatio="landscape"
        caption="A conversation about creator work."
        credit={{
          name: 'Alex Photographer',
          href: '/photographers/alex',
          source: 'Creator Conference',
          sourceHref: '/events/creator-conference',
        }}
        fit="contain"
        position="center 70%"
        src="/panel.jpg"
      />,
    );

    const image = screen.getByRole('img', { name: 'RV speaking on a panel' });
    expect(image).toHaveClass(
      'rvds-image',
      'rvds-image--aspect-landscape',
      'rvds-image--fit-contain',
    );
    expect(image).toHaveStyle({ '--rvds-image-object-position': 'center 70%' });
    expect(screen.getByText('A conversation about creator work.')).toHaveClass(
      'rvds-image-figure__description',
    );
    expect(screen.getByText('Alex Photographer')).toHaveAttribute('href', '/photographers/alex');
    expect(screen.getByText('Creator Conference')).toHaveAttribute(
      'href',
      '/events/creator-conference',
    );
  });

  it('keeps an uncaptioned image free of unnecessary figure markup', () => {
    const { container } = render(<Image alt="A portrait" src="/portrait.jpg" />);
    expect(container.querySelector('figure')).toBeNull();
  });

  it('renders a labeled gallery as a semantic list', () => {
    render(
      <Gallery
        label="Trip photographs"
        items={[
          { src: '/one.jpg', alt: 'A street' },
          { src: '/two.jpg', alt: 'A market' },
        ]}
      />,
    );
    expect(screen.getByRole('list', { name: 'Trip photographs' })).toHaveClass(
      'rvds-gallery',
      'rvds-gallery--2-columns',
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
