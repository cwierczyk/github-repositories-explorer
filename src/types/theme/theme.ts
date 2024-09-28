import {
  type Breakpoints,
  type ColorPalette,
  type Fonts,
  type Radius,
  type Spacing,
} from '@/types';

export interface CustomTheme {
  colors: ColorPalette;
  fonts: Fonts;
  spacing: Spacing;
  radius: Radius;
  breakpoints: Breakpoints;
}
