import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'padded',
    options: { storySort: { order: ['Foundations', 'Components', 'Patterns', 'Accessibility', 'Examples'] } },
  },
};
export default preview;
