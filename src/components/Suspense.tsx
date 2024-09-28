import {
  type ReactElement,
  type ReactNode,
  Suspense as NativeSuspense,
} from 'react';

import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

import { Typography } from './Typography';

interface Props {
  fallback?: ReactElement;
  children: ReactNode;
}

export const Suspense: FunctionComponent<Props> = ({ fallback, children }) => {
  const { t } = useTranslation('common');

  return (
    <NativeSuspense
      fallback={fallback ?? <Typography>{t('loading')}</Typography>}
    >
      {children}
    </NativeSuspense>
  );
};
