import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock, Divider, Paragraph, Quote } from '../components/Typography';
const meta = { title: 'Editorial/Typography' } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
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
