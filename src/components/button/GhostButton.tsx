import { forwardRef } from 'react';
import styled from '@emotion/styled';

import { BaseButton, type BaseButtonProps } from './BaseButton';

export const GhostButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function GhostButton(props, ref) {
    return <StyledBaseButton {...props} ref={ref} />;
  },
);

const StyledBaseButton = styled(BaseButton)`
  color: ${({ theme }) => theme.colors.button.ghostFg};

  &:hover {
    color: ${({ theme }) => theme.colors.button.ghostFgHover};
    background: ${({ theme }) => theme.colors.button.ghostBgHover};
  }
`;
