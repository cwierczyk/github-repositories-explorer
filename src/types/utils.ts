import { type ReactElement } from 'react';

export type FunctionComponent<T = Record<string, never>> = (
  props: T,
) => ReactElement | null;
