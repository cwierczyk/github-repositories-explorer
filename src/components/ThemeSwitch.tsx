import styled from '@emotion/styled';

import { useTheme } from '@/hooks';
import { type FunctionComponent } from '@/types';

import { SwitchInput } from './input';

export const ThemeSwitch: FunctionComponent = () => {
  const { mode, changeMode } = useTheme();

  return (
    <Label data-testid="theme-switch-label">
      <Emoji>🌞</Emoji>
      <SwitchInput
        checked={mode === 'dark'}
        onChange={(_, checked) => changeMode(checked ? 'dark' : 'light')}
      />
      <Emoji>🌜</Emoji>
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Emoji = styled.span`
  font-size: 1.5rem;
`;
