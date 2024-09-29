import { type ColorPalette } from '@/types';

import { base, blue, error, lightGray as gray } from './colors';

export const themeLight: Record<'colors', ColorPalette> = {
  colors: {
    text: {
      primary: gray['900'],
      secondary: gray['700'],
      tertiary: gray['600'],
      white: base.white,
      bluePrimary: blue['900'],
      blueSecondary: blue['700'],
      blueTertiary: blue['600'],
      errorPrimary: error['700'],
    },
    border: {
      primary: gray['300'],
      secondary: gray['200'],
      tertiary: gray['100'],
      blue: blue['300'],
      blueSolid: blue['600'],
      error: error['300'],
    },
    foreground: {
      primary: gray['900'],
      secondary: gray['700'],
      tertiary: gray['600'],
    },
    background: {
      primary: base.white,
      secondary: gray['50'],
      tertiary: gray['100'],
      blueSolid: blue['600'],
      errorPrimary: error['50'],
    },
    button: {
      primaryFg: base.white,
      primaryBg: blue['600'],
      primaryBgHover: blue['700'],
      primaryBorder: blue['600'],
      primaryBorderHover: blue['700'],
      ghostFg: blue['700'],
      ghostFgHover: blue['800'],
      ghostBgHover: blue['50'],
    },
  },
} as const;
