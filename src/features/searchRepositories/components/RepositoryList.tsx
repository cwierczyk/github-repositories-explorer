import { useCallback, useRef } from 'react';
import styled from '@emotion/styled';

import { Loader, Typography } from '@/components';
import { useInfiniteQueryGithubUserRepositories } from '@/features/searchRepositories';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

import { RepositoryItem } from './RepositoryItem';

interface Props {
  username: string;
}

export const RepositoryList: FunctionComponent<Props> = ({ username }) => {
  const { repositories, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQueryGithubUserRepositories(username);
  const { t } = useTranslation('githubUserRepositories');
  const containerObserver = useRef<IntersectionObserver | null>(null);

  const lastRepoElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (containerObserver.current) containerObserver.current.disconnect();

      containerObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage().catch(() => {
            throw new Error('Failed to fetch next page');
          });
        }
      });

      if (node) containerObserver.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  if (!repositories.length)
    return (
      <EmptyState>
        <Typography color="tertiary">{t('repositoryListNotFound')}</Typography>
      </EmptyState>
    );

  return (
    <Container>
      {repositories.map((repo, index) => (
        <div
          key={repo.name}
          ref={
            repositories.length === index + 1 ? lastRepoElementRef : undefined
          }
        >
          <RepositoryItem key={repo.name} repo={repo} />
        </div>
      ))}
      {isFetchingNextPage && <Loader />}
    </Container>
  );
};

const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
