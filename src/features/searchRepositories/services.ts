import { getRequest } from '@/services';
import { type Request } from '@/types';

import { GITHUB_API_ENDPOINTS } from './const';
import {
  type GithubListResponseDto,
  type GithubUser,
  type GithubUserRepositoryDto,
  type InfiniteQueryGithubUserRepositoriesParamsDto,
  type InfiniteQueryGithubUserRepositoriesPayload,
  type PaginatedGithubUserRepositories,
  type QuerySearchUsersParams,
  type QuerySearchUsersParamsDto,
} from './types';

export const getSearchUsers: Request<
  GithubUser[],
  QuerySearchUsersParams
> = async (params) => {
  const { data } = await getRequest<
    GithubListResponseDto<GithubUser>,
    QuerySearchUsersParamsDto
  >(GITHUB_API_ENDPOINTS.searchUsers, {
    q: params.q,
    per_page: params.perPage,
  });

  return data.items.map((item) => ({
    login: item.login,
  }));
};

export const getUserRepositories: Request<
  PaginatedGithubUserRepositories,
  InfiniteQueryGithubUserRepositoriesPayload
> = async ({ username, perPage, page }) => {
  const { headers, data } = await getRequest<
    GithubUserRepositoryDto[],
    InfiniteQueryGithubUserRepositoriesParamsDto
  >(GITHUB_API_ENDPOINTS.getUserRepositories(username), {
    page: page,
    per_page: perPage,
  });

  const linkHeader = headers['link'] as string | undefined;
  const hasNextPage = !!linkHeader?.includes('rel="next"');

  return {
    nextPage: hasNextPage ? page + 1 : null,
    repositories: data.map((item) => ({
      name: item.name,
      description: item.description,
      stargazersCount: item.stargazers_count,
    })),
  };
};
