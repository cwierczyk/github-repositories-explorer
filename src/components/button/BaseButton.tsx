import { forwardRef, type MouseEvent, type ReactElement } from 'react';
import styled from '@emotion/styled';

export interface BaseButtonProps {
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaHaspopup?: boolean;
  disabled?: boolean;
  children: string | ReactElement;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  function BaseButton(
    {
      children,
      type = 'button',
      disabled,
      ariaExpanded,
      ariaHaspopup,
      ariaControls,
      ...props
    },
    ref,
  ) {
    return (
      <StyledButton
        {...props}
        aria-disabled={disabled}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHaspopup}
        aria-controls={ariaControls}
        disabled={disabled}
        type={type}
        ref={ref}
      >
        {children}
      </StyledButton>
    );
  },
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
