import { useContext } from 'react';

import { LOCAL_STORAGE_THEME_PREFERENCE } from '@/const';
import { ThemeContext } from '@/context';
import { type ColorMode } from '@/types';

export const useTheme = () => {
  const { mode, changeMode } = useContext(ThemeContext);

  const handleChangeMode = (newMode: ColorMode) => {
    changeMode(newMode);
    localStorage.setItem(LOCAL_STORAGE_THEME_PREFERENCE, newMode);
  };

  return {
    mode,
    changeMode: handleChangeMode,
  };
};
