import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../components/Layout';

function Foundations() {
  const colors = ['text', 'text-muted', 'background', 'surface', 'surface-muted', 'border', 'action', 'action-hover', 'action-text', 'accent', 'link', 'focus', 'error', 'success'];
  const spaces = [1, 2, 3, 4, 5, 6, 7, 8];
  return <Stack>
    <section><h2>Semantic color</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(9rem,1fr))', gap: '1rem' }}>{colors.map((name) => <div key={name}><div style={{ background: `var(--color-${name})`, border: '1px solid var(--color-border)', height: '4rem' }} /><code>--color-{name}</code></div>)}</div></section>
    <section><h2>Typography</h2><h1 style={{ fontSize: 'var(--font-size-2xl)' }}>Minimal, clear, and direct.</h1><p style={{ maxWidth: '70ch' }}>Inter supports expressive creator headlines and comfortable long-form reading while keeping the dark interface restrained.</p></section>
    <section><h2>Spacing</h2>{spaces.map((space) => <div key={space} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBlock: '.5rem' }}><code>--space-{space}</code><span style={{ display: 'block', width: `var(--space-${space})`, height: '1rem', background: 'var(--color-accent)' }} /></div>)}</section>
    <section><h2>Focus and motion</h2><p>All interactive examples have a visible focus ring. Motion tokens collapse when the operating system requests reduced motion.</p></section>
  </Stack>;
}
const meta = { title: 'Foundations/Tokens', component: Foundations } satisfies Meta<typeof Foundations>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};
