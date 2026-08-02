import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'padded',
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Color', 'Typography', 'Spacing'],
          'Components',
          ['Actions', 'Layout', 'Navigation', 'Social Links', 'Brand'],
          'Editorial',
          ['Typography', 'Prose', 'Lists', 'Media', 'Embeds', 'Article Previews'],
          'Patterns',
          ['Case Studies'],
          'Examples',
          ['Article Composition', 'MDX Article'],
        ],
      },
    },
  },
};
export default preview;
