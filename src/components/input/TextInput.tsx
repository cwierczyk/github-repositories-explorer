import { type ChangeEvent, type KeyboardEvent } from 'react';
import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

interface Props {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  ariaControls?: string;
}

export const TextInput: FunctionComponent<Props> = ({
  onChange,
  disabled,
  ariaControls,
  ...props
}) => {
  return (
    <StyledInput
      {...props}
      type="text"
      onChange={(event) => onChange?.(event, event.target.value)}
      aria-disabled={disabled}
      aria-controls={ariaControls}
      disabled={disabled}
    />
  );
};

const StyledInput = styled.input`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: 0.25s ease all;
  outline: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fonts.size.md};
  line-height: ${({ theme }) => theme.fonts.lineHeight.md};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
    opacity: 1;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.blue};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.disabled};
    border-color: ${({ theme }) => theme.colors.border.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;
