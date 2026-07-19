import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock, Divider, Heading, Paragraph, Quote } from '../components/Typography';
const meta = { title: 'Blog/Basic Text' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Paragraphs: Story = {
  render: () => (
    <>
      <Paragraph size="lead">A lead paragraph gives readers a clear way into the story.</Paragraph>
      <Paragraph>
        Body paragraphs are designed for sustained reading without becoming visually dense.
      </Paragraph>
      <Paragraph size="small">
        Supporting context can be quieter without becoming illegible.
      </Paragraph>
    </>
  ),
};
export const Headings: Story = {
  render: () => (
    <>
      <Heading level={2} size={1}>
        Semantic level two, visually level one
      </Heading>
      <Heading level={3}>
        A long heading that demonstrates natural wrapping at narrow article widths without clipping
        or horizontal scrolling
      </Heading>
    </>
  ),
};
export const Quotation: Story = {
  render: () => (
    <Quote attribution="A thoughtful writer" citationUrl="https://example.com/source">
      The most useful details are often the ones that make a story feel lived in.
    </Quote>
  ),
};
export const Code: Story = {
  render: () => (
    <CodeBlock
      caption="A small TypeScript example"
      code={'const greeting = "Hello, reader";\nconsole.log(greeting);'}
      language="typescript"
    />
  ),
};
export const WrappedCode: Story = {
  render: () => (
    <CodeBlock
      wrap
      caption="Wrapping enabled"
      code={
        'const exceptionallyLongValue = "This line can wrap when an article needs to avoid horizontal scrolling.";'
      }
    />
  ),
};
export const SectionDivider: Story = {
  render: () => (
    <>
      <Paragraph>One idea ends here.</Paragraph>
      <Divider />
      <Paragraph>Another begins below the divider.</Paragraph>
    </>
  ),
};
