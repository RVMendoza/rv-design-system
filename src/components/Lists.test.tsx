import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BulletedList, NumberedList } from './Lists';

describe('blog lists', () => {
  it('supports valid mixed nesting in either direction', () => {
    const { container } = render(<BulletedList><li>Dash item<NumberedList><li>Numbered child<BulletedList><li>Dash grandchild</li></BulletedList></li></NumberedList></li></BulletedList>);
    expect(container.querySelector('ul.rvds-bulleted-list > li > ol.rvds-numbered-list')).not.toBeNull();
    expect(container.querySelector('ol.rvds-numbered-list > li > ul.rvds-bulleted-list')).not.toBeNull();
  });

  it('preserves native ordered-list controls and item values', () => {
    const { container } = render(<NumberedList reversed start={5}><li value={8}>Eight</li><li>Seven</li></NumberedList>);
    const list = container.querySelector('ol');
    expect(list).toHaveAttribute('reversed');
    expect(list).toHaveAttribute('start', '5');
    expect(container.querySelector('li')).toHaveAttribute('value', '8');
  });
});
