import { type COLOR_MODES } from '@/const/theme';

export interface ColorPalette {
  text: Record<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'bluePrimary'
    | 'blueSecondary'
    | 'blueTertiary'
    | 'errorPrimary',
    string
  >;
  border: Record<
    'primary' | 'secondary' | 'tertiary' | 'blue' | 'blueSolid' | 'error',
    string
  >;
  foreground: Record<'primary' | 'secondary' | 'tertiary', string>;
  background: Record<
    'primary' | 'secondary' | 'tertiary' | 'errorPrimary',
    string
  >;
  button: Record<
    | 'primaryFg'
    | 'primaryBg'
    | 'primaryBgHover'
    | 'primaryBorder'
    | 'primaryBorderHover'
    | 'ghostFg'
    | 'ghostFgHover'
    | 'ghostBgHover',
    string
  >;
}

export type ColorMode = (typeof COLOR_MODES)[number];
