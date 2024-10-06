import { vi } from 'vitest';

import { Loader } from '@/components';
import { render } from '@/test';

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Loader component', () => {
  it('renders loading text', () => {
    const { getByText } = render(<Loader />);

    expect(getByText('loading')).toBeInTheDocument();
  });
});
