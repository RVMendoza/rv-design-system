import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLogo } from '../components/BrandLogos';
import { BrandMarquee } from '../components/BrandMarquee';

const meta = {
  title: 'Components/Brand Marquee',
  component: BrandMarquee,
  args: {
    label: 'Brands RV has worked with',
    children: (
      <>
        {['Instagram', 'Microsoft', 'PBS', 'Spotify', 'Taco Bell'].map((name) => (
          <li key={name}>
            <BrandLogo name={name} logo={{ src: '/favicon.svg' }} />
          </li>
        ))}
      </>
    ),
  },
} satisfies Meta<typeof BrandMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfiniteInteractiveRail: Story = {};

export const FasterMotion: Story = {
  args: { pixelsPerSecond: 55 },
};
