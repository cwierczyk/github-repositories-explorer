import { type ReactElement } from 'react';
import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

import { Topbar } from './Topbar';

interface Props {
  children: ReactElement;
}

export const Layout: FunctionComponent<Props> = ({ children }) => (
  <Container>
    <Topbar />
    {children}
  </Container>
);

const Container = styled.div`
  position: relative;
`;
