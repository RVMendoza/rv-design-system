import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextInput } from './FormField';

describe('TextInput', () => {
  it('associates label, hint, and error', () => {
    render(<TextInput label="Email" hint="Work email is fine." error="Enter an email." />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAccessibleDescription('Work email is fine. Enter an email.');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
