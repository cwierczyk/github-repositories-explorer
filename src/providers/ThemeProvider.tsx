import { type ReactNode, useState } from 'react';
import {
  css,
  Global,
  type Theme,
  ThemeProvider as EmotionProvider,
} from '@emotion/react';

import { COLOR_MODES, LOCAL_STORAGE_THEME_PREFERENCE } from '@/const';
import { ThemeContext } from '@/context';
import { useLocalStorage } from '@/hooks';
import { darkTheme, lightTheme } from '@/theme';
import { type ColorMode, type FunctionComponent } from '@/types';

interface Props {
  children: ReactNode;
}

const THEMES: Record<ColorMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const ThemeProvider: FunctionComponent<Props> = ({ children }) => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const userPreferenceTheme = useLocalStorage(
    LOCAL_STORAGE_THEME_PREFERENCE,
    COLOR_MODES,
  );
  const [mode, changeMode] = useState<ColorMode>(
    userPreferenceTheme ?? systemTheme,
  );

  const theme = THEMES[mode];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        changeMode,
      }}
    >
      <EmotionProvider theme={theme}>
        <Global
          styles={css`
            :root {
              font-family: Lato, system-ui, sans-serif;
              font-size: 16px;
              font-weight: 400;
              line-height: 1.5;

              color-scheme: light dark;
              color: ${theme.colors.text.primary};
              background-color: ${theme.colors.background.primary};

              font-synthesis: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
          `}
        />
        {children}
      </EmotionProvider>
    </ThemeContext.Provider>
  );
};
