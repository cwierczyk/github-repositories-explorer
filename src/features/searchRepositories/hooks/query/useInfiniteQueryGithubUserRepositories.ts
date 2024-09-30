import {
  getUserRepositories,
  GITHUB_API_QUERY_KEYS,
  type GithubUserRepository,
  type PaginatedGithubUserRepositories,
} from '@/features/searchRepositories';
import { useSuspenseInfiniteQuery } from '@/hooks';
import { type ApiError } from '@/types';

const DEFAULT_PAGE_PARAM = 1;
const DEFAULT_PER_PAGE = 20;

export const useInfiniteQueryGithubUserRepositories = (username: string) => {
  const { hasNextPage, fetchNextPage, data, isFetchingNextPage } =
    useSuspenseInfiniteQuery<PaginatedGithubUserRepositories, ApiError>({
      queryKey: [GITHUB_API_QUERY_KEYS.userRepositories, username],
      queryFn: ({ pageParam }) =>
        getUserRepositories({
          username,
          page: Number(pageParam),
          perPage: DEFAULT_PER_PAGE,
        }),
      initialPageParam: DEFAULT_PAGE_PARAM,
      getNextPageParam: ({ nextPage }) => nextPage,
    });

  return {
    repositories: data.pages.reduce<GithubUserRepository[]>(
      (acc, val) => [...acc, ...val.repositories],
      [],
    ),
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
