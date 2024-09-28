import { type Theme } from '@emotion/react';

import { themeCommon } from './common';
import { themeDark } from './dark';
import { themeLight } from './light';

export const lightTheme: Theme = {
  ...themeCommon,
  ...themeLight,
} as const;

export const darkTheme: Theme = {
  ...themeCommon,
  ...themeDark,
} as const;
