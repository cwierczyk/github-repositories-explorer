import { beforeEach, describe, type Mock, vi } from 'vitest';

import {
  type GithubUserRepository,
  RepositoryList,
} from '@/features/searchRepositories';
import { useSuspenseInfiniteQuery } from '@/hooks';
import { render } from '@/test';

const MOCKED_REPOSITORIES: GithubUserRepository[] = [
  {
    name: 'Repo1',
    description: 'Description1',
    stargazersCount: 10,
  },
  {
    name: 'Repo2',
    description: 'Description2',
    stargazersCount: 20,
  },
];

vi.mock('@/hooks', async () => {
  const original = await vi.importActual('@/hooks');

  return {
    ...original,
    useSuspenseInfiniteQuery: vi.fn(),
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

describe('RepositoryList component', () => {
  const mockUsername = 'testuser';
  let observerCallback: IntersectionObserverCallback | null = null;

  beforeAll(() => {
    global.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe() {}

      unobserve() {}

      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when there are no repositories', async () => {
    (useSuspenseInfiniteQuery as Mock).mockReturnValue({
      data: { pages: [{ repositories: [] }] },
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    const { findByText } = render(<RepositoryList username={mockUsername} />);

    expect(await findByText('repositoryListNotFound')).toBeInTheDocument();
  });

  it('renders repository items when there are repositories', async () => {
    (useSuspenseInfiniteQuery as Mock).mockReturnValue({
      data: {
        pages: [
          {
            repositories: MOCKED_REPOSITORIES,
          },
        ],
      },
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    });

    const { findByText } = render(<RepositoryList username={mockUsername} />);

    expect(await findByText('Repo1')).toBeInTheDocument();
    expect(await findByText('Repo2')).toBeInTheDocument();
  });

  it('renders loader when fetching next page', async () => {
    (useSuspenseInfiniteQuery as Mock).mockReturnValue({
      data: {
        pages: [
          {
            repositories: MOCKED_REPOSITORIES,
          },
        ],
      },
      hasNextPage: false,
      isFetchingNextPage: true,
      fetchNextPage: vi.fn(),
    });

    const { findByText } = render(<RepositoryList username={mockUsername} />);

    expect(await findByText('loading')).toBeInTheDocument();
  });

  it('fetches next page when last repository is in view', async () => {
    const fetchNextPage = vi.fn();
    (useSuspenseInfiniteQuery as Mock).mockReturnValue({
      data: {
        pages: [
          {
            repositories: MOCKED_REPOSITORIES,
          },
        ],
      },
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage: fetchNextPage.mockImplementation(() => Promise.resolve()),
    });

    const { findByText } = render(<RepositoryList username={mockUsername} />);

    const lastRepoElement = await findByText('Repo2');

    observerCallback!(
      [
        {
          isIntersecting: true,
          target: lastRepoElement,
          boundingClientRect: lastRepoElement.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: lastRepoElement.getBoundingClientRect(),
          rootBounds: null,
          time: Date.now(),
        },
      ],
      new IntersectionObserver(() => {}),
    );

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });
});
