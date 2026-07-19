import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery, Image, VideoEmbed } from '../components/Media';
const placeholder =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect width="100%25" height="100%25" fill="%2319181b"/%3E%3Cpath d="M0 430L220 220l150 140 120-100 310 240H0z" fill="%231b998b"/%3E%3Ccircle cx="620" cy="130" r="58" fill="%23f4b942"/%3E%3C/svg%3E';
const meta = { title: 'Blog/Media' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const ResponsiveImage: Story = {
  render: () => (
    <Image
      alt="Abstract landscape placeholder"
      caption="A generic, locally encoded placeholder."
      height={500}
      src={placeholder}
      width={800}
    />
  ),
};
export const ImageGallery: Story = {
  render: () => (
    <Gallery
      columns={3}
      label="Example gallery"
      items={[1, 2, 3].map((item) => ({
        id: String(item),
        src: placeholder,
        alt: `Abstract placeholder ${item}`,
        caption: `Image ${item}`,
      }))}
    />
  ),
};
export const NativeVideo: Story = {
  render: () => (
    <VideoEmbed title="Example video player" caption="Native controls with metadata preload.">
      <source src="/example-video.mp4" type="video/mp4" />
    </VideoEmbed>
  ),
};
