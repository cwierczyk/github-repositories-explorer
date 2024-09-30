import { useState } from 'react';
import styled from '@emotion/styled';

import { Accordion, ErrorBoundary, Suspense, Typography } from '@/components';
import { useQuerySearchGithubUsers } from '@/features/searchRepositories';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

import { RepositoryList } from './RepositoryList';

interface Props {
  query: string;
}

const PER_PAGE = 5;

export const UserList: FunctionComponent<Props> = ({ query }) => {
  const { users } = useQuerySearchGithubUsers({ q: query, perPage: PER_PAGE });
  const [expanded, setExpanded] = useState<string | null>(null);
  const { t } = useTranslation('githubUserRepositories');

  return (
    <Container>
      <Typography color="secondary" tag="p">
        {t(users.length ? 'userListDescription' : 'userListNotFound', {
          username: query,
        })}
      </Typography>
      {users.map(({ login }) => (
        <Accordion
          key={login}
          open={login === expanded}
          title={login}
          content={
            <ErrorBoundary>
              <Suspense>
                {login === expanded && <RepositoryList username={login} />}
              </Suspense>
            </ErrorBoundary>
          }
          onExpand={() => setExpanded(login === expanded ? null : login)}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;
