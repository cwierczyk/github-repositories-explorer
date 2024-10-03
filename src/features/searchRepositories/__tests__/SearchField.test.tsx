import { fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { SearchField } from '@/features/searchRepositories';
import { render } from '@/test';

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('SearchField component', () => {
  const mockOnSubmitSearch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search field with correct placeholder', () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchField onSubmitSearch={mockOnSubmitSearch} isLoading={false} />,
    );

    const input = getByPlaceholderText('placeholder.username');
    const button = getByRole('button', { name: 'button.search' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('disables the submit button when input is empty', () => {
    const { getByRole } = render(
      <SearchField onSubmitSearch={mockOnSubmitSearch} isLoading={false} />,
    );

    const button = getByRole('button', { name: 'button.search' });

    expect(button).toBeDisabled();
  });

  it('enables the submit button when input has text', () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchField onSubmitSearch={mockOnSubmitSearch} isLoading={false} />,
    );

    const input = getByPlaceholderText('placeholder.username');
    const button = getByRole('button', { name: 'button.search' });

    fireEvent.change(input, { target: { value: 'testuser' } });

    expect(button).not.toBeDisabled();
  });

  it('calls onSubmitSearch with input value when button is clicked', () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchField onSubmitSearch={mockOnSubmitSearch} isLoading={false} />,
    );

    const input = getByPlaceholderText('placeholder.username');
    const button = getByRole('button', { name: 'button.search' });

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);

    expect(mockOnSubmitSearch).toHaveBeenCalledWith('testuser');
  });

  it('calls onSubmitSearch when Enter key is pressed', () => {
    const { getByPlaceholderText } = render(
      <SearchField onSubmitSearch={mockOnSubmitSearch} isLoading={false} />,
    );

    const input = getByPlaceholderText('placeholder.username');

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnSubmitSearch).toHaveBeenCalledWith('testuser');
  });

  it('disables the submit button when isLoading is true', () => {
    const { getByRole } = render(
      <SearchField onSubmitSearch={mockOnSubmitSearch} isLoading={true} />,
    );

    const button = getByRole('button', { name: 'loading' });

    expect(button).toBeDisabled();
  });
});
