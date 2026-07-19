import type { Meta, StoryObj } from '@storybook/react-vite';
function SpacingTokens() {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((space) => (
        <div
          key={space}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBlock: '.5rem' }}
        >
          <code>--rvds-space-{space}</code>
          <span
            style={{
              display: 'block',
              width: `var(--rvds-space-${space})`,
              height: '1rem',
              background: 'var(--rvds-color-accent)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
const meta = { title: 'Foundations/Spacing', component: SpacingTokens } satisfies Meta<
  typeof SpacingTokens
>;
export default meta;
export const Scale: StoryObj<typeof meta> = {};
