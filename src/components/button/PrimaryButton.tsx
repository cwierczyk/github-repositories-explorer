import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { BaseButton, type BaseButtonProps } from './BaseButton';

export const PrimaryButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function PrimaryButton(props, ref) {
    return <StyledBaseButton {...props} ref={ref} />;
  },
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

  &:disabled {
    border-color: ${({ theme }) => theme.colors.border.disabled};
    background: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;
