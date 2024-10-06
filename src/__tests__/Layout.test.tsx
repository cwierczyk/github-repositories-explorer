import { describe, expect, vi } from 'vitest';

import { Container, Layout } from '@/components/layout';
import { render } from '@/test';

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: vi.fn(),
    },
  }),
  useTheme: () => ({
    theme: 'light',
  }),
}));

describe('Layout components', () => {
  it('renders Container component correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Test Container</div>
      </Container>,
    );

    expect(getByText('Test Container')).toBeInTheDocument();
  });

  it('renders Layout component correctly', () => {
    const { getByText, getByRole } = render(
      <Layout>
        <div>Inside layout content</div>
      </Layout>,
    );

    expect(getByRole('switch', { hidden: true })).toBeInTheDocument();

    expect(
      getByRole('button', { name: /en language.en/i }),
    ).toBeInTheDocument();

    expect(getByText('Inside layout content')).toBeInTheDocument();
  });
});
