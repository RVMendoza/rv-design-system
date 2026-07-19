import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkipLink } from '../components/SkipLink';
const meta = { title: 'Components/Navigation', component: SkipLink } satisfies Meta<
  typeof SkipLink
>;
export default meta;
export const KeyboardSkipLink: StoryObj<typeof meta> = {
  render: () => (
    <>
      <SkipLink href="#storybook-main">Skip to example content</SkipLink>
      <p>Press Tab to reveal the skip link.</p>
      <main id="storybook-main" tabIndex={-1}>
        <h2>Example content</h2>
      </main>
    </>
  ),
};
