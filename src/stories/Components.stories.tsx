import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { TextInput } from '../components/FormField';
import { Cluster, Container, Stack } from '../components/Layout';
import { Link } from '../components/Link';
import { SkipLink } from '../components/SkipLink';

const meta = { title: 'Components/Overview', tags: ['autodocs'] } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Buttons: Story = { render: () => <Cluster><Button>Start a project</Button><Button variant="secondary">Read the story</Button><Button variant="quiet">Maybe later</Button><Button disabled>Unavailable</Button><Button loading>Sending</Button></Cluster> };
export const LongContent: Story = { render: () => <Button>This label is intentionally long to demonstrate wrapping without clipping at narrow widths</Button> };
export const Links: Story = { render: () => <Cluster><Link href="#example">Text link</Link><Link href="#example" variant="primary">Primary link</Link><Link href="#example" variant="secondary">Secondary link</Link></Cluster> };
export const LayoutAndCard: Story = { render: () => <Container reading><Stack><Card><h2>A reusable editorial card</h2><p>This generic component accepts long content, semantic article markup, and responsive container constraints.</p></Card><Cluster><span>Comedy</span><span>Culture</span><span>Technology</span></Cluster></Stack></Container> };
export const Fields: Story = { render: () => <Container reading><Stack><TextInput label="Project name" hint="Use the name your team recognizes." placeholder="Campaign name" /><TextInput label="Email" required type="email" error="Enter a valid email address." defaultValue="not-an-email" /><TextInput label="Disabled example" disabled defaultValue="Unavailable" /></Stack></Container> };
export const KeyboardSkipLink: Story = { render: () => <><SkipLink href="#storybook-main">Skip to example content</SkipLink><p>Press Tab to reveal the skip link.</p><main id="storybook-main" tabIndex={-1}><h2>Example content</h2></main></> };
