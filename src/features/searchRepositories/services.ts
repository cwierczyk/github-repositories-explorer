import { getRequest } from '@/services';
import { type Request } from '@/types';

import { GITHUB_API_ENDPOINTS } from './const';
import {
  type GithubListResponseDto,
  type GithubUser,
  type GithubUserRepository,
  type GithubUserRepositoryDto,
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
  GithubUserRepository[],
  string
> = async (username) => {
  const { data } = await getRequest<GithubUserRepositoryDto[]>(
    GITHUB_API_ENDPOINTS.getUserRepos(username),
  );

  return data.map((item) => ({
    name: item.name,
    description: item.description,
    stargazersCount: item.stargazers_count,
  }));
};
