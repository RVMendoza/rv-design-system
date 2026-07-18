import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('supports keyboard activation', async () => {
    const user = userEvent.setup(); const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);
    await user.tab(); await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });
  it('announces loading and prevents activation', () => {
    render(<Button loading>Send</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
  it('exposes stable RVDS BEM classes', () => {
    render(<Button variant="secondary" fullWidth>Continue</Button>);
    expect(screen.getByRole('button')).toHaveClass('rvds-button', 'rvds-button--secondary', 'rvds-button--full-width');
  });
});
