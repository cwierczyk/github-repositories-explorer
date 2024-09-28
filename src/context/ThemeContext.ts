import { createContext } from 'react';

import { type ColorMode } from '@/types';

interface ThemeContext {
  mode: ColorMode;
  changeMode: (mode: ColorMode) => void;
}

export const ThemeContext = createContext<ThemeContext>({
  mode: 'light',
  changeMode: () => {
    throw new Error('ThemeContext provider not implemented');
  },
});
