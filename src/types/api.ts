import { type AxiosError, type AxiosRequestConfig } from 'axios';

export type Request<
  Return = void,
  Payload = void,
> = Payload extends void | AxiosRequestConfig
  ? NonPayloadRequest<Return>
  : PayloadRequest<Return, Payload>;

export type NonPayloadRequest<Return> = (
  config?: AxiosRequestConfig,
) => Promise<Return>;

export type PayloadRequest<Return, Payload> = (
  payload: Payload,
  config?: AxiosRequestConfig,
) => Promise<Return>;

export type ApiError = AxiosError;
