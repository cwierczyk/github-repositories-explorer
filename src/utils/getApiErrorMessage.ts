import { isAxiosError } from 'axios';

import { type ApiError } from '@/types';

export const getApiErrorMessage = (error: unknown): string | undefined => {
  if (!error || !isAxiosError<ApiError>(error)) return undefined;

  const errorResponse = error.response?.data;

  if (!errorResponse) return undefined;

  return `Error ${errorResponse.status}: ${errorResponse.message}`;
};
