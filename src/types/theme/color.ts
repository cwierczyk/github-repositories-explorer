import { type COLOR_MODES } from '@/const/theme';

export interface ColorPalette {
  text: Record<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'bluePrimary'
    | 'blueSecondary'
    | 'blueTertiary',
    string
  >;
  border: Record<
    'primary' | 'secondary' | 'tertiary' | 'blue' | 'blueSolid',
    string
  >;
  foreground: Record<'primary' | 'secondary' | 'tertiary', string>;
  background: Record<'primary' | 'secondary' | 'tertiary', string>;
  button: Record<
    | 'primaryFg'
    | 'primaryBg'
    | 'primaryBgHover'
    | 'primaryBorder'
    | 'primaryBorderHover',
    string
  >;
}

export type ColorMode = (typeof COLOR_MODES)[number];
