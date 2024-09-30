export interface QuerySearchUsersParams {
  q?: string;
  perPage?: number;
}

export interface GithubUser {
  login: string;
}

export interface GithubUserRepository {
  name: string;
  description: string | null;
  stargazersCount: number;
}

export interface PaginatedGithubUserRepositories {
  repositories: GithubUserRepository[];
  nextPage: number | null;
}
