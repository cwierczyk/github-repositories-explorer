import { type ColorPalette } from '@/types';

import { base, blue, darkGray as gray, error } from './colors';

export const themeDark: Record<'colors', ColorPalette> = {
  colors: {
    text: {
      primary: gray['50'],
      secondary: gray['300'],
      tertiary: gray['400'],
      white: base.white,
      bluePrimary: blue['50'],
      blueSecondary: blue['300'],
      blueTertiary: blue['400'],
      errorPrimary: error['50'],
    },
    border: {
      primary: gray['700'],
      secondary: gray['800'],
      tertiary: gray['800'],
      blue: blue['400'],
      blueSolid: blue['500'],
      error: error['500'],
    },
    foreground: {
      primary: base.white,
      secondary: gray['300'],
      tertiary: gray['400'],
    },
    background: {
      primary: gray['950'],
      secondary: gray['900'],
      tertiary: gray['800'],
      blueSolid: blue['600'],
      errorPrimary: error['800'],
    },
    button: {
      primaryFg: base.white,
      primaryBg: blue['600'],
      primaryBgHover: blue['700'],
      primaryBorder: blue['600'],
      primaryBorderHover: blue['700'],
      ghostFg: blue['300'],
      ghostFgHover: blue['100'],
      ghostBgHover: blue['800'],
    },
  },
} as const;
