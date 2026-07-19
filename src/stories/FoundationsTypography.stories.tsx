import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Paragraph } from '../components/Typography';
const meta = { title: 'Foundations/Typography', component: Heading } satisfies Meta<typeof Heading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const TypeScale: Story = {
  args: { level: 1, children: 'Typography' },
  render: () => (
    <>
      <Heading level={1}>Heading level one</Heading>
      <Heading level={2}>Heading level two</Heading>
      <Heading level={3}>Heading level three</Heading>
      <Heading level={4}>Heading level four</Heading>
      <Heading level={5}>Heading level five</Heading>
      <Heading level={6}>Heading level six</Heading>
      <Paragraph size="lead">
        Lead text introduces an article with a little more presence.
      </Paragraph>
      <Paragraph>Body text stays comfortable across long passages.</Paragraph>
      <Paragraph size="small">Small text supports captions and metadata.</Paragraph>
    </>
  ),
};
