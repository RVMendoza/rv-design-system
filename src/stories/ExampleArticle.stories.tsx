import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenericEmbed, YoutubeEmbed } from '../components/Embeds';
import { BulletedList, NumberedList } from '../components/Lists';
import { Container, Stack } from '../components/Layout';
import { CodeBlock, Divider, Heading, Paragraph, Quote } from '../components/Typography';
function ArticleExample() { return <Container reading><article><Stack>
  <header><Heading level={1}>What a small kitchen taught me about paying attention</Heading><Paragraph size="lead">A generic article composition showing how the public blog primitives work together.</Paragraph><Paragraph size="small">Published July 18, 2026 · 5 minute read</Paragraph></header>
  <Paragraph>The useful thing about a familiar routine is that it gives the details somewhere to land. A sound, a smell, or a repeated mistake can become part of the story.</Paragraph>
  <Heading level={2}>Start with what is already there</Heading>
  <BulletedList><li>Notice the repeated details.</li><li>Write down the specific language people use.<NumberedList><li>Keep the first version plain.</li><li>Add context only where it helps.</li></NumberedList></li><li>Leave room for the reader.</li></BulletedList>
  <Quote attribution="A thoughtful observer">Specificity gives a reader something real to hold.</Quote>
  <Heading level={2}>A tiny technical aside</Heading><CodeBlock code={'const details = observations.filter(Boolean);'} language="typescript" />
  <Divider />
  <GenericEmbed description="A script-free related reading preview." provider="Publication" title="Read a related article" url="https://example.com/article" />
  <YoutubeEmbed caption="A privacy-enhanced Youtube player that loads lazily near the viewport." title="Beyoncé – All Night" videoId="gM89Q5Eng_M" />
</Stack></article></Container>; }
const meta = { title: 'Examples/Article', component: ArticleExample, parameters: { layout: 'padded' } } satisfies Meta<typeof ArticleExample>;
export default meta;
export const CompleteArticle: StoryObj<typeof meta> = {};
