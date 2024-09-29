import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

import { BaseButton, type BaseButtonProps } from './BaseButton';

export const GhostButton: FunctionComponent<BaseButtonProps> = (props) => (
  <StyledBaseButton {...props} />
);

const StyledBaseButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.button.ghostFg};

  &:hover {
    color: ${({ theme }) => theme.colors.button.ghostFgHover};
    background: ${({ theme }) => theme.colors.button.ghostBgHover};
  }
`;
