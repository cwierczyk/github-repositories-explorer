import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

import { BaseButton, type BaseButtonProps } from './BaseButton';

export const PrimaryButton: FunctionComponent<BaseButtonProps> = (props) => (
  <StyledBaseButton {...props} />
);

const StyledBaseButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.button.primaryFg};
  background: ${({ theme }) => theme.colors.button.primaryBg};
  border: 1px solid ${({ theme }) => theme.colors.button.primaryBorder};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${({ theme }) => theme.colors.button.primaryBgHover};
    border-color: ${({ theme }) => theme.colors.button.primaryBorderHover};
  }
`;
