import { describe, vi } from 'vitest';

import { ErrorBoundary } from '@/components';
import { render } from '@/test';

const FailingComponent = () => {
  throw new Error('Test error');
};

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ErrorBoundary component', () => {
  it('renders children when there are no errors', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>,
    );

    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('renders fallback UI when an error is thrown', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <FailingComponent />
      </ErrorBoundary>,
    );

    expect(getByText('Error: Test error')).toBeInTheDocument();
  });
});
