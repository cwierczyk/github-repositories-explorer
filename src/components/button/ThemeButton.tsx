import { useTheme } from '@/hooks';

export const ThemeButton = () => {
  const { mode, changeMode } = useTheme();

  return (
    <button onClick={() => changeMode(mode === 'light' ? 'dark' : 'light')}>
      Current mode: {mode === 'light' ? '🌞' : '🌜'}
    </button>
  );
};
