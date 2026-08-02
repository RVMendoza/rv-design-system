import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleHeader, ArticleList, ArticlePreview } from '../components/Articles';
import { Container, Stack } from '../components/Layout';
import { Heading, Paragraph } from '../components/Typography';

const meta = {
  title: 'Editorial/Article Previews',
  component: ArticlePreview,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ArticlePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RowCollection: Story = {
  args: { href: '#article', title: 'Article' },
  render: () => (
    <Container>
      <Stack space="var(--rvds-space-7)">
        <div>
          <Paragraph size="small">Writing / Essays and observations</Paragraph>
          <Heading level={1}>Writing</Heading>
          <Paragraph size="lead">
            Long-form ideas organized for comfortable reading and quick scanning.
          </Paragraph>
        </div>
        <ArticleList contentAlignment="flush" aria-label="Example articles">
          <li>
            <ArticlePreview
              href="#first"
              title="A photographed article preview"
              description="A concise summary helps readers decide where to begin."
              image={{
                src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
                alt: 'A hand writes in an open notebook beside a cup of coffee.',
                width: 1200,
                height: 900,
              }}
            />
          </li>
          <li>
            <ArticlePreview
              href="#second"
              title="A deliberately long article title that wraps without colliding with its summary or navigation affordance"
              description="This state demonstrates resilient typography at narrow widths and high zoom."
            />
          </li>
        </ArticleList>
      </Stack>
    </Container>
  ),
};

export const TopicGrid: Story = {
  args: { href: '#article', title: 'Article' },
  render: () => (
    <Container>
      <ArticleList layout="grid" density="compact" aria-label="Compact writing overview">
        <li>
          <ArticlePreview
            eyebrow="Creator strategy"
            href="#first"
            markerIcon="brain-circuit"
            title="A useful idea with a clear point of view"
            description="A concise summary gives the reader enough context to choose what to read without making the overview feel dense."
            image={{
              src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
              alt: 'A hand writes in an open notebook beside a cup of coffee.',
              width: 1200,
              height: 900,
            }}
          />
        </li>
        <li>
          <ArticlePreview
            eyebrow="Culture"
            markerIcon="diamond"
            href="#second"
            title="A deliberately long title that wraps across several lines without crowding the card"
            description="The full description remains in the document while the compact visual treatment limits it to three lines."
          />
        </li>
        <li>
          <ArticlePreview
            eyebrow="Life"
            markerIcon="orbit"
            href="#third"
            title="A smaller card can still carry personality"
            description="Images and decorative markers remain part of the editorial overview."
            image={{
              src: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
              alt: 'A notebook and laptop arranged on a wooden desk.',
              width: 1200,
              height: 900,
            }}
          />
        </li>
      </ArticleList>
    </Container>
  ),
};

export const LongFormHeader: Story = {
  args: { href: '#article', title: 'Article' },
  render: () => (
    <Container reading>
      <ArticleHeader
        backHref="#writing"
        title="A clear hierarchy for a long-form article"
        description="The description remains visible as an honest introduction while editorial dates stay out of the headline area."
      />
      <Paragraph>The authored article body begins here.</Paragraph>
    </Container>
  ),
};
