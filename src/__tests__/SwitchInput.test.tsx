import { fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { SwitchInput } from '@/components';
import { render } from '@/test';

describe('SwitchInput component', () => {
  it('renders with the correct initial state', () => {
    const { getByRole } = render(
      <SwitchInput checked ariaLabel="Toggle switch" />,
    );

    const checkbox = getByRole('switch', {
      hidden: true,
    });

    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-label', 'Toggle switch');
  });

  it('calls onChange handler when switch is toggled', () => {
    const handleChange = vi.fn();

    const { getByRole } = render(<SwitchInput onChange={handleChange} />);

    const checkbox = getByRole('switch', {
      hidden: true,
    });

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), true);
  });

  it('toggles checked state on click', () => {
    const handleChange = vi.fn();

    const { getByRole } = render(
      <SwitchInput checked onChange={handleChange} />,
    );

    const checkbox = getByRole('switch', {
      hidden: true,
    });

    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), false);
  });
});
