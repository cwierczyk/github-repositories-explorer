import { type COLOR_MODES } from '@/const/theme';

export interface ColorPalette {
  text: Record<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'white'
    | 'placeholder'
    | 'disabled'
    | 'bluePrimary'
    | 'blueSecondary'
    | 'blueTertiary'
    | 'errorPrimary',
    string
  >;
  border: Record<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'disabled'
    | 'blue'
    | 'blueSolid'
    | 'error',
    string
  >;
  foreground: Record<'primary' | 'secondary' | 'tertiary', string>;
  background: Record<
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'disabled'
    | 'blueSolid'
    | 'errorPrimary',
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
