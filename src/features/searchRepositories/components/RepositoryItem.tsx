import styled from '@emotion/styled';

import { StarFillIcon } from '@/assets/icons';
import { Icon, Typography } from '@/components';
import { type GithubUserRepository } from '@/features/searchRepositories';
import { type FunctionComponent } from '@/types';

interface Props {
  repo: GithubUserRepository;
}

export const RepositoryItem: FunctionComponent<Props> = ({ repo }) => (
  <Container data-testid="repository-container">
    <div>
      <Typography size="lg" fontWeight="semibold">
        {repo.name}
      </Typography>
      {repo.description && (
        <Typography tag="p" color="tertiary">
          {repo.description}
        </Typography>
      )}
    </div>
    <Row>
      <Typography size="xl" fontWeight="bold">
        {repo.stargazersCount.toString()}
      </Typography>
      <Icon icon={StarFillIcon} size="1.25rem" />
    </Row>
  </Container>
);

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) =>
    `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.xl}`};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;
