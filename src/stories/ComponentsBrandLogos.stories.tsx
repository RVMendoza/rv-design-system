import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandLogo, BrandLogoList } from '../components/BrandLogos';

const meta = {
  title: 'Components/Brand Logos',
  component: BrandLogoList,
} satisfies Meta<typeof BrandLogoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collaborators: Story = {
  args: {
    'aria-label': 'Brands RV has worked with',
    children: (
      <>
        <li>
          <BrandLogo name="Instagram" href="#instagram" logo={{ src: '/favicon.svg' }} />
        </li>
        <li>
          <BrandLogo name="Microsoft" href="#microsoft" logo={{ src: '/favicon.svg' }} />
        </li>
        <li>
          <BrandLogo name="A collaborator with a long name" href="#long" />
        </li>
      </>
    ),
  },
};
