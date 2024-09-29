import {
  getSearchUsers,
  GITHUB_API_QUERY_KEYS,
  type QuerySearchUsersParams,
} from '@/features/searchRepositories';
import { useSuspenseQuery } from '@/hooks';

export const useQueryGithubUsers = (params: QuerySearchUsersParams) => {
  const { data: users } = useSuspenseQuery({
    queryKey: [GITHUB_API_QUERY_KEYS.searchUsers, params],
    queryFn: () => getSearchUsers(params),
  });

  return {
    users,
  };
};
