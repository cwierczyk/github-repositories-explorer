import { fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';

import { TextInput } from '@/components';
import { render } from '@/test';

describe('TextInput component', () => {
  it('renders with the correct placeholder', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Custom placeholder" />,
    );

    const input = getByPlaceholderText(/custom placeholder/i);

    expect(input).toBeInTheDocument();
  });

  it('renders with the default value', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="custom placeholder" value="default value" />,
    );

    const input = getByPlaceholderText(/custom placeholder/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('default value');
  });

  it('calls onChange handler when input changes', () => {
    const handleChange = vi.fn();

    const { getByPlaceholderText } = render(
      <TextInput placeholder="Custom placeholder" onChange={handleChange} />,
    );

    const input = getByPlaceholderText(/custom placeholder/i);

    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), 'Hello');
  });

  it('is disabled when the disabled prop is true', () => {
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Custom placeholder" disabled />,
    );

    const input = getByPlaceholderText(/custom placeholder/i);

    expect(input).toBeDisabled();
  });

  it('calls onKeyDown handler when key is pressed', () => {
    const handleKeyDown = vi.fn();
    const { getByPlaceholderText } = render(
      <TextInput placeholder="Custom placeholder" onKeyDown={handleKeyDown} />,
    );

    const input = getByPlaceholderText(/custom placeholder/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });
});
