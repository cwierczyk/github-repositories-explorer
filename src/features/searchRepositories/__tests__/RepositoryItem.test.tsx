import { describe } from 'vitest';

import {
  type GithubUserRepository,
  RepositoryItem,
} from '@/features/searchRepositories';
import { render } from '@/test';

const MOCK_REPO: GithubUserRepository = {
  name: 'Test Repository',
  description: 'This is a test repository',
  stargazersCount: 42,
};

describe('RepositoryItem component', () => {
  it('renders the repository name, description and stargazers count', () => {
    const { getByText } = render(<RepositoryItem repo={MOCK_REPO} />);

    const nameElement = getByText('Test Repository');
    const descriptionElement = getByText('This is a test repository');
    const stargazersElement = getByText('42');

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(stargazersElement).toBeInTheDocument();
  });

  it('does not render description if it is not provided', () => {
    const repoWithoutDescription: GithubUserRepository = {
      ...MOCK_REPO,
      description: null,
    };

    const { queryByText } = render(
      <RepositoryItem repo={repoWithoutDescription} />,
    );

    expect(queryByText('This is a test repository')).not.toBeInTheDocument();
  });
});
