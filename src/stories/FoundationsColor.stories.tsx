import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../components/Layout';

function ColorTokens() {
  const colors = ['text', 'text-muted', 'background', 'surface', 'surface-muted', 'border', 'action', 'action-hover', 'action-text', 'accent', 'link', 'focus', 'error', 'success'];
  return <Stack><Heading>Semantic color</Heading><p>Sunflower gold identifies links, focus, and attention. Verdigris identifies primary actions and success.</p><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(9rem,1fr))', gap: '1rem' }}>{colors.map((name) => <div key={name}><div style={{ background: `var(--rvds-color-${name})`, border: '1px solid var(--rvds-color-border)', height: '4rem' }} /><code>--rvds-color-{name}</code></div>)}</div></Stack>;
}
function Heading({ children }: { children: string }) { return <h1>{children}</h1>; }
const meta = { title: 'Foundations/Color', component: ColorTokens } satisfies Meta<typeof ColorTokens>;
export default meta;
export const SemanticTokens: StoryObj<typeof meta> = {};
