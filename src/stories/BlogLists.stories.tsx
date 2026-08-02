import type { Meta, StoryObj } from '@storybook/react-vite';
import { BulletedList, NumberedList } from '../components/Lists';
const meta = { title: 'Editorial/Lists', component: BulletedList } satisfies Meta<
  typeof BulletedList
>;
export default meta;
type Story = StoryObj<typeof meta>;
export const DashList: Story = {
  args: { children: null },
  render: () => (
    <BulletedList>
      <li>First observation</li>
      <li>Second observation</li>
      <li>
        A longer observation that wraps naturally without separating its decorative dash from the
        list semantics
      </li>
    </BulletedList>
  ),
};
export const Numbered: Story = {
  args: { children: null },
  render: () => (
    <NumberedList start={3}>
      <li>Third step</li>
      <li>Fourth step</li>
    </NumberedList>
  ),
};
export const MixedNesting: Story = {
  args: { children: null },
  render: () => (
    <NumberedList>
      <li>
        Plan the article
        <BulletedList>
          <li>Choose the central idea</li>
          <li>
            Check supporting details
            <NumberedList>
              <li>Verify the source.</li>
              <li>Keep the useful context.</li>
            </NumberedList>
          </li>
        </BulletedList>
      </li>
    </NumberedList>
  ),
};
