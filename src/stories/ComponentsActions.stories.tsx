import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { Cluster } from '../components/Layout';
import { Link } from '../components/Link';
const meta = { title: 'Components/Actions', component: Button } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Buttons: Story = {
  args: { children: 'Start a project' },
  render: () => (
    <Cluster>
      <Button>Start a project</Button>
      <Button variant="secondary">Read the story</Button>
      <Button variant="quiet">Maybe later</Button>
      <Button variant="subtle">Open details</Button>
      <Button disabled>Unavailable</Button>
      <Button loading>Sending</Button>
    </Cluster>
  ),
};
export const Links: Story = {
  args: { children: 'Link' },
  render: () => (
    <Cluster>
      <Link href="#example">Text link</Link>
      <Link href="#example" variant="primary">
        Primary link
      </Link>
      <Link href="#example" variant="secondary">
        Secondary link
      </Link>
    </Cluster>
  ),
};
export const FullWidthActionLink: Story = {
  args: { children: 'View the media kit' },
  render: () => (
    <div style={{ inlineSize: 'min(100%, 24rem)' }}>
      <Link href="#example" variant="subtle" fullWidth>
        View the media kit
      </Link>
    </div>
  ),
};
export const PrimaryLinkButtonStates: Story = {
  args: { children: 'Primary link button' },
  parameters: {
    docs: {
      description: {
        story:
          'Hover for the high-contrast bright-verdigris-on-black treatment, Tab to inspect the sunflower-gold focus ring, and press to inspect the active state.',
      },
    },
  },
  render: () => (
    <Link href="#primary-link-example" variant="primary">
      Primary link button
    </Link>
  ),
};
export const HoverAndKeyboardStates: Story = {
  args: { children: 'Interactive action' },
  parameters: {
    docs: {
      description: {
        story:
          'Hover each action to compare its non-color cue. Primary actions invert to bright verdigris on black with a border and underline, while secondary and quiet actions gain an underline. Use Tab to verify that the sunflower-gold focus ring remains distinct from hover.',
      },
    },
  },
  render: () => (
    <Cluster>
      <Button>Primary action</Button>
      <Button variant="secondary">Secondary action</Button>
      <Button variant="quiet">Quiet action</Button>
    </Cluster>
  ),
};
export const LongLabel: Story = {
  args: { children: 'Long label' },
  render: () => (
    <Button>
      This label is intentionally long to demonstrate wrapping without clipping at narrow widths
    </Button>
  ),
};
