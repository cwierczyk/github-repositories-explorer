import { describe, expect, type Mock, vi } from 'vitest';

import { type GithubUser, UserList } from '@/features/searchRepositories';
import { useSuspenseQuery } from '@/hooks';
import { render } from '@/test';

const MOCK_USERS: GithubUser[] = [
  { login: 'user1' },
  { login: 'user2' },
  { login: 'user3' },
];

vi.mock('@/hooks', async () => {
  const original = await vi.importActual('@/hooks');

  return {
    ...original,
    useSuspenseQuery: vi.fn(),
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

describe('UserList component', () => {
  const mockedQuery = 'testuser';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly when there are no users', async () => {
    (useSuspenseQuery as Mock).mockReturnValue({
      data: [],
    });

    const { findByText } = render(<UserList query={mockedQuery} />);

    expect(await findByText('userListNotFound')).toBeInTheDocument();
  });

  test('renders correctly when there are users', async () => {
    (useSuspenseQuery as Mock).mockReturnValue({
      data: MOCK_USERS,
    });

    const { findByText } = render(<UserList query={mockedQuery} />);

    expect(await findByText('userListDescription')).toBeInTheDocument();

    for (const user of MOCK_USERS) {
      expect(await findByText(user.login)).toBeInTheDocument();
    }
  });
});
