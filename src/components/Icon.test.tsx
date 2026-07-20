import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from './Icon';
import { resolveIconName } from './IconNames';

describe('Icon', () => {
  it('resolves canonical kebab-case Lucide names', () => {
    expect(resolveIconName('camera')).toBe('Camera');
    expect(resolveIconName('message-circle-heart')).toBe('MessageCircleHeart');
  });

  it('falls back safely and stays decorative by default', () => {
    const { container } = render(<Icon name="not-a-real-icon" />);
    expect(resolveIconName('not-a-real-icon')).toBe('Sparkles');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports an accessible label when an icon conveys meaning', () => {
    render(<Icon label="Camera" name="camera" />);
    expect(screen.getByRole('img', { name: 'Camera' })).toBeInTheDocument();
  });
});
