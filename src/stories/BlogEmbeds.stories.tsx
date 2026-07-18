import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenericEmbed, InstagramEmbed, TiktokEmbed, YoutubeEmbed } from '../components/Embeds';
const meta = { title: 'Blog/Embeds' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Youtube: Story = { render: () => <YoutubeEmbed caption="The privacy-enhanced player loads lazily near the viewport." title="Beyoncé – All Night" videoId="gM89Q5Eng_M" /> };
export const Instagram: Story = { render: () => <InstagramEmbed description="Open this post on Instagram without loading provider scripts here." title="Example photo post" url="https://www.instagram.com/p/example/" /> };
export const Tiktok: Story = { render: () => <TiktokEmbed description="Open this video on Tiktok without loading provider scripts here." title="Example short video" url="https://www.tiktok.com/@example/video/1" /> };
export const GenericUrl: Story = { render: () => <GenericEmbed description="A lightweight preview supplied entirely through component props." provider="Publication" title="A related article" url="https://example.com/article" /> };
