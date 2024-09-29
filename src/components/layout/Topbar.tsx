import styled from '@emotion/styled';

import { ErrorBoundary, LanguageSelector, ThemeSwitch } from '@/components';
import { type FunctionComponent } from '@/types';

export const Topbar: FunctionComponent = () => (
  <Wrapper>
    <Container>
      <ErrorBoundary>
        <ThemeSwitch />
      </ErrorBoundary>
      <ErrorBoundary>
        <LanguageSelector />
      </ErrorBoundary>
    </Container>
  </Wrapper>
);

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.blueSolid};
  background: ${({ theme }) => theme.colors.background.primary};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
`;
