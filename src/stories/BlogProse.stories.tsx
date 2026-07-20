import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from '../components/Prose';

const meta = {
  title: 'Blog/Basic Text/Prose',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MarkdownArticle: Story = {
  render: () => (
    <Prose as="article">
      <h2>Native Markdown, finished by RVDS</h2>
      <p>
        Authors can keep writing ordinary Markdown while the design system provides consistent
        typography, spacing, lists, quotations, code, media, and captions.
      </p>
      <ul>
        <li>A dash list remains a real unordered list.</li>
        <li>
          Mixed nesting works.
          <ol>
            <li>Ordered details remain ordered.</li>
          </ol>
        </li>
      </ul>
      <figure>
        <svg aria-label="Abstract editorial illustration" role="img" viewBox="0 0 800 450">
          <rect fill="#19181b" height="450" width="800" />
          <circle cx="400" cy="225" fill="#1b998b" r="140" />
        </svg>
        <figcaption>Native figures receive the same quiet, centered caption treatment.</figcaption>
      </figure>
    </Prose>
  ),
};
