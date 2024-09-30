import {
  type ReactElement,
  type ReactNode,
  Suspense as NativeSuspense,
} from 'react';

import { type FunctionComponent } from '@/types';

import { Loader } from './Loader';

interface Props {
  fallback?: ReactElement;
  children: ReactNode;
}

export const Suspense: FunctionComponent<Props> = ({ fallback, children }) => (
  <NativeSuspense fallback={fallback ?? <Loader />}>{children}</NativeSuspense>
);
