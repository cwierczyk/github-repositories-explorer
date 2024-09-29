import { useState } from 'react';
import styled from '@emotion/styled';

import { ErrorBoundary, Suspense } from '@/components';
import { useIsFetching } from '@/hooks';

import { SearchField } from './SearchField';
import { UserList } from './UserList';

export function SearchRepositoriesFeature() {
  const [query, setQuery] = useState('');
  const isFetching = useIsFetching();

  return (
    <Container>
      <SearchField onSubmitSearch={setQuery} isLoading={!!isFetching} />
      <ErrorBoundary>
        <Suspense>{!!query.length && <UserList query={query} />}</Suspense>
      </ErrorBoundary>
    </Container>
  );
}

const Container = styled.div`
  max-width: 768px;
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;
