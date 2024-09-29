import {
  getUserRepositories,
  GITHUB_API_QUERY_KEYS,
  type GithubUserRepository,
} from '@/features/searchRepositories';
import { useSuspenseQuery } from '@/hooks';
import { type ApiError } from '@/types';

export const useQueryGithubUserRepositories = (username: string) => {
  const { data: repositories } = useSuspenseQuery<
    GithubUserRepository[],
    ApiError,
    GithubUserRepository[]
  >({
    queryKey: [GITHUB_API_QUERY_KEYS.getUserRepos, username],
    queryFn: () => getUserRepositories(username),
  });

  return {
    repositories,
  };
};
