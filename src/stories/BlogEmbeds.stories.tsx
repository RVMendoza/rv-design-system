import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenericEmbed, InstagramEmbed, TikTokEmbed, YouTubeEmbed } from '../components/Embeds';
const meta = { title: 'Blog/Embeds' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const YouTube: Story = { render: () => <YouTubeEmbed caption="The player loads only after activation." title="Example video" videoId="dQw4w9WgXcQ" /> };
export const Instagram: Story = { render: () => <InstagramEmbed description="Open this post on Instagram without loading provider scripts here." title="Example photo post" url="https://www.instagram.com/p/example/" /> };
export const TikTok: Story = { render: () => <TikTokEmbed description="Open this video on TikTok without loading provider scripts here." title="Example short video" url="https://www.tiktok.com/@example/video/1" /> };
export const GenericUrl: Story = { render: () => <GenericEmbed description="A lightweight preview supplied entirely through component props." provider="Publication" title="A related article" url="https://example.com/article" /> };
