import { type ReactNode } from 'react';
import {
  ErrorBoundary as NativeErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary';
import styled from '@emotion/styled';

import { isProduction } from '@/const';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';
import { getApiErrorMessage } from '@/utils';

import { Typography } from './Typography';

interface Props {
  children: ReactNode;
}

export const ErrorBoundary: FunctionComponent<Props> = ({ children }) => (
  <NativeErrorBoundary FallbackComponent={FallbackComponent}>
    {children}
  </NativeErrorBoundary>
);

const FallbackComponent: FunctionComponent<FallbackProps> = ({ error }) => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Typography color="errorPrimary">
        {isProduction
          ? t('errorMessage.production')
          : (getApiErrorMessage(error) ?? String(error))}
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.background.errorPrimary};
  border: 1px solid ${({ theme }) => theme.colors.border.error};
`;
