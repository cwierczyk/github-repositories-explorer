import { type MouseEvent, type ReactElement } from 'react';
import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

export interface BaseButtonProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: string | ReactElement;
}

export const BaseButton: FunctionComponent<BaseButtonProps> = ({
  children,
  type = 'button',
  ...props
}) => (
  <StyledButton type={type} {...props}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.25s ease all;
  font-size: ${({ theme }) => theme.fonts.size.md};
  line-height: ${({ theme }) => theme.fonts.lineHeight.md};
  font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;
