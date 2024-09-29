import { type ReactElement } from 'react';
import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

interface Props {
  children: ReactElement | ReactElement[];
}

export const Container: FunctionComponent<Props> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
`;
