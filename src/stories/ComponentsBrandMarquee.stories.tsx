import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLogo } from '../components/BrandLogos';
import { BrandMarquee } from '../components/BrandMarquee';

const meta = {
  title: 'Components/Brand/Marquee',
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

export const DefaultInteractiveRail: Story = {};

DefaultInteractiveRail.parameters = {
  docs: {
    description: {
      story:
        'Automatic motion pauses for direct pointer, touch, keyboard-focus, or horizontal-wheel interaction, then recovers after release, capture loss, or window blur. Momentum is intentionally not applied.',
    },
  },
};
