import axios, { type AxiosPromise } from 'axios';

import { GITHUB_API_URL, GITHUB_AUTH_TOKEN } from '@/const';

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_AUTH_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

export const getRequest = <ResponseType, ParamsType = never>(
  url: string,
  params?: ParamsType,
): AxiosPromise<ResponseType> => githubApi.get<ResponseType>(url, { params });
