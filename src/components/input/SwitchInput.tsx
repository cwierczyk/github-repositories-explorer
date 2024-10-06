import { type ChangeEvent } from 'react';
import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

interface Props {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  ariaLabel?: string;
}

export const SwitchInput: FunctionComponent<Props> = ({
  checked = false,
  onChange,
  ariaLabel,
}) => (
  <Label>
    <SwitchCheckbox
      type="checkbox"
      role="switch"
      checked={checked}
      onChange={(event) => onChange?.(event, event.target.checked)}
      aria-label={ariaLabel}
    />
    <Slider $checked={checked} />
  </Label>
);

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchCheckbox = styled.input`
  display: none;
`;

const Slider = styled.span<{ $checked: boolean }>`
  position: relative;
  width: 50px;
  height: 25px;
  background-color: ${({ theme, $checked }) =>
    $checked
      ? theme.colors.background.blueSolid
      : theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.radius.full};
  transition: background-color 0.3s;

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.text.white};
    border-radius: ${({ theme }) => theme.radius.full};
    top: 2.5px;
    left: 2.5px;
    transition: transform 0.3s;
    transform: ${({ $checked }) => $checked && `translateX(25px);`};
  }
`;
