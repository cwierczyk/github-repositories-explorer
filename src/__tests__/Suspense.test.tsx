import { describe, vi } from 'vitest';

import { Suspense } from '@/components';
import { render } from '@/test';

const PromiseChild = () => {
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw new Promise(() => {});
};

const ImmediateChild = () => <div>Loaded Child Component</div>;

vi.mock('@/hooks', () => ({
  useLocalStorage: vi.fn(),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Suspense component', () => {
  it('renders the fallback component while loading', () => {
    const { getByText } = render(
      <Suspense>
        <PromiseChild />
      </Suspense>,
    );

    expect(getByText('loading')).toBeInTheDocument();
  });

  it('renders children after loading', async () => {
    const { findByText } = render(
      <Suspense>
        <ImmediateChild />
      </Suspense>,
    );

    expect(await findByText('Loaded Child Component')).toBeInTheDocument();
  });

  it('renders the custom fallback component when provided', () => {
    const CustomFallback = () => <div>Custom Loading...</div>;

    const { getByText } = render(
      <Suspense fallback={<CustomFallback />}>
        <PromiseChild />
      </Suspense>,
    );

    expect(getByText('Custom Loading...')).toBeInTheDocument();
  });
});
