import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenericEmbed, InstagramEmbed, TiktokEmbed, YoutubeEmbed } from '../components/Embeds';
const meta = { title: 'Blog/Embeds' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Youtube: Story = {
  render: () => (
    <YoutubeEmbed
      caption="The privacy-enhanced player loads lazily near the viewport."
      title="Beyoncé – All Night"
      videoId="gM89Q5Eng_M"
    />
  ),
};
export const Instagram: Story = {
  render: () => (
    <InstagramEmbed
      description="Open this post on Instagram without loading provider scripts here."
      title="Instagram post"
      url="https://www.instagram.com/p/DESbLWOuM95/"
    />
  ),
};
export const Tiktok: Story = {
  render: () => (
    <TiktokEmbed
      description="Open this video on Tiktok without loading provider scripts here."
      title="Tiktok video"
      url="https://www.tiktok.com/@rvxmendoza/video/7368864505985617195"
    />
  ),
};
export const GenericUrl: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Hover the card or focus it with the keyboard. The title underline accompanies the border change so the interactive state does not rely on color alone.',
      },
    },
  },
  render: () => (
    <GenericEmbed
      description="View the media kit in a new tab."
      provider="Media kit"
      title="RV Mendoza media kit"
      url="https://beacons.ai/rvxmendoza/mediakit"
    />
  ),
};
