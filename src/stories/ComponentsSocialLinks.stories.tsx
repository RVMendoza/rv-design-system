import type { Meta, StoryObj } from '@storybook/react-vite';
import { SocialLinks } from '../components/SocialLinks';

const meta = {
  title: 'Components/Social Links',
  component: SocialLinks,
} satisfies Meta<typeof SocialLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreatorProfiles: Story = {
  args: {
    links: [
      { provider: 'instagram', label: 'Instagram', href: '#instagram' },
      { provider: 'tiktok', label: 'Tiktok', href: '#tiktok' },
      { provider: 'youtube', label: 'Youtube', href: '#youtube' },
      { provider: 'linkedin', label: 'LinkedIn', href: '#linkedin' },
      { provider: 'threads', label: 'Threads', href: '#threads' },
      { provider: 'substack', label: 'Newsletter', href: '#newsletter' },
      { provider: 'generic', label: 'Another profile', href: '#another' },
    ],
  },
};

export const LongWrappingList: Story = {
  args: {
    label: 'Creator profiles and channels',
    links: Array.from({ length: 16 }, (_, index) => ({
      provider: 'generic' as const,
      label: `Profile ${index + 1}`,
      href: `#profile-${index + 1}`,
    })),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem' }}>
        <Story />
      </div>
    ),
  ],
};
