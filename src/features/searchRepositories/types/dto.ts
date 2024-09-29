export interface QuerySearchUsersParamsDto {
  q?: string;
  per_page?: number;
}

export interface GithubListResponseDto<ResponseType> {
  incomplete_results: boolean;
  items: ResponseType[];
  total_count: number;
}

export interface GithubUserRepositoryDto {
  name: string;
  description: string | null;
  stargazers_count: number;
}
