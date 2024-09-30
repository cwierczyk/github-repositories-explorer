import { createElement, type ReactHTML } from 'react';
import styled from '@emotion/styled';

import { type lightTheme } from '@/theme';
import { type fonts } from '@/theme/common/fonts';
import { type FunctionComponent } from '@/types';

type Size = keyof typeof fonts.size;
type Weight = keyof typeof fonts.weight;
type Color = keyof typeof lightTheme.colors.text;

interface Props {
  size?: Size;
  fontWeight?: Weight;
  color?: Color;
  tag?: keyof ReactHTML;
  className?: string;
  inherit?: boolean;
  children: string;
}

export const Typography: FunctionComponent<Props> = ({
  size = 'md',
  fontWeight = 'regular',
  color = 'primary',
  inherit = false,
  ...props
}) => (
  <StyledDynamicTypography
    {...props}
    $size={size}
    $fontWeight={fontWeight}
    $color={color}
    $inherit={inherit}
  />
);

const DynamicTypography: FunctionComponent<
  Pick<Props, 'tag' | 'className' | 'children'>
> = ({ tag = 'span', children, className }) =>
  createElement(tag, { className }, children);

const StyledDynamicTypography = styled(DynamicTypography)<{
  $size: Size;
  $fontWeight: Weight;
  $color: Color;
  $inherit: boolean;
}>`
  font-size: ${({ $size, theme, $inherit }) =>
    $inherit ? 'inherit' : theme.fonts.size[$size]};
  line-height: ${({ $size, theme, $inherit }) =>
    $inherit ? 'inherit' : theme.fonts.lineHeight[$size]};
  font-weight: ${({ $fontWeight, theme, $inherit }) =>
    $inherit ? 'inherit' : theme.fonts.weight[$fontWeight]};
  color: ${({ $color, theme, $inherit }) =>
    $inherit ? 'inherit' : theme.colors.text[$color]};
  line-break: anywhere;
`;
