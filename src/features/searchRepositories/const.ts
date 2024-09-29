export const GITHUB_API_ENDPOINTS = Object.freeze({
  searchUsers: '/search/users',
  getUserRepos: (username: string) => `/users/${username}/repos`,
});

export const GITHUB_API_QUERY_KEYS = Object.freeze({
  searchUsers: 'searchUsers',
  getUserRepos: 'getUserRepos',
});
