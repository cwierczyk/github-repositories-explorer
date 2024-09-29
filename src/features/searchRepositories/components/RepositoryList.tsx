import styled from '@emotion/styled';

import { Typography } from '@/components';
import { useQueryGithubUserRepositories } from '@/features/searchRepositories';
import { useTranslation } from '@/hooks';
import { type FunctionComponent } from '@/types';

import { RepositoryItem } from './RepositoryItem';

interface Props {
  username: string;
}

export const RepositoryList: FunctionComponent<Props> = ({ username }) => {
  const { repositories } = useQueryGithubUserRepositories(username);
  const { t } = useTranslation('githubUserRepositories');

  if (!repositories.length)
    return (
      <EmptyState>
        <Typography color="tertiary">{t('repositoryListNotFound')}</Typography>
      </EmptyState>
    );

  return (
    <Container>
      {repositories.map((repo) => (
        <RepositoryItem key={repo.name} repo={repo} />
      ))}
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
