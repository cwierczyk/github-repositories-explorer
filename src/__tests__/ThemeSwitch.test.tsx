import { fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, vi } from 'vitest';

import { ThemeSwitch } from '@/components';
import { render } from '@/test';

const mockChangeMode = vi.fn();

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTheme: () => ({
    mode: 'light',
    changeMode: mockChangeMode,
  }),
}));

describe('ThemeSwitch component', () => {
  beforeEach(() => {
    mockChangeMode.mockClear();
  });

  it('renders with light mode initially', () => {
    const { getByText, getByRole } = render(<ThemeSwitch />);

    expect(getByText('🌞')).toBeInTheDocument();
    expect(getByText('🌜')).toBeInTheDocument();

    const input = getByRole('switch', { hidden: true });

    expect(input).not.toBeChecked();
  });

  it('calls changeMode with "dark" when switch is toggled', () => {
    const { getByRole } = render(<ThemeSwitch />);

    const input = getByRole('switch', { hidden: true });

    fireEvent.click(input);

    expect(mockChangeMode).toHaveBeenCalledWith('dark');
  });
});
