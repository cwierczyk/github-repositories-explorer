import styled from '@emotion/styled';

import { StarFillIcon } from '@/assets/icons';
import { type FunctionComponent } from '@/types';

import { Icon } from './Icon';
import { Typography } from './Typography';

interface Props {
  title: string;
  description: string;
  follows: number;
}

export const UserRepository: FunctionComponent<Props> = ({
  title,
  description,
  follows,
}) => (
  <Container>
    <div>
      <Typography size="lg" fontWeight="semibold">
        {title}
      </Typography>
      <Typography tag="p" color="tertiary">
        {description}
      </Typography>
    </div>
    <Row>
      <Typography size="xl" fontWeight="bold">
        {follows.toString()}
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
