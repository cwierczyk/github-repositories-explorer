import { fireEvent } from '@testing-library/react';
import { describe, vi } from 'vitest';

import { LanguageSelector } from '@/components';
import { render } from '@/test';

const mockTranslate = vi.fn();
const mockChangeLanguage = vi.fn();

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: mockChangeLanguage.mockImplementation(() =>
        Promise.resolve(),
      ),
    },
  }),
}));

describe('LanguageSelector component', () => {
  beforeEach(() => {
    mockTranslate.mockClear();
    mockChangeLanguage.mockClear();
  });

  it('renders with current language', () => {
    const { getByRole, getByAltText } = render(<LanguageSelector />);

    expect(
      getByRole('button', { name: /en language.en/i }),
    ).toBeInTheDocument();
    expect(getByAltText('en')).toHaveAttribute(
      'src',
      '/src/assets/icons/en-flag.svg',
    );
  });

  it('opens the language menu when clicked', () => {
    const { getByRole, queryByRole, getByAltText } = render(
      <LanguageSelector />,
    );

    expect(
      queryByRole('button', { name: /pl language.pl/i }),
    ).not.toBeInTheDocument();
    expect(
      queryByRole('button', { name: /de language.de/i }),
    ).not.toBeInTheDocument();

    const button = getByRole('button', { name: /en language.en/i });

    fireEvent.click(button);

    expect(
      getByRole('button', { name: /pl language.pl/i }),
    ).toBeInTheDocument();
    expect(getByAltText('pl')).toHaveAttribute(
      'src',
      '/src/assets/icons/pl-flag.svg',
    );
    expect(
      getByRole('button', { name: /de language.de/i }),
    ).toBeInTheDocument();
    expect(getByAltText('de')).toHaveAttribute(
      'src',
      '/src/assets/icons/de-flag.svg',
    );
  });

  it('calls changeLanguage with selected language', () => {
    const { getByRole } = render(<LanguageSelector />);

    fireEvent.click(getByRole('button', { name: /en language.en/i }));
    fireEvent.click(getByRole('button', { name: /pl language.pl/i }));

    expect(mockChangeLanguage).toHaveBeenCalledWith('pl');
  });
});
