import {
  getSearchUsers,
  GITHUB_API_QUERY_KEYS,
  type GithubUser,
  type QuerySearchUsersParams,
} from '@/features/searchRepositories';
import { useSuspenseQuery } from '@/hooks';
import { type ApiError } from '@/types';

export const useQuerySearchGithubUsers = (params: QuerySearchUsersParams) => {
  const { data: users } = useSuspenseQuery<GithubUser[], ApiError>({
    queryKey: [GITHUB_API_QUERY_KEYS.searchUsers, params],
    queryFn: () => getSearchUsers(params),
  });

  return {
    users,
  };
};
