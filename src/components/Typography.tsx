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
  children: string;
}

export const Typography: FunctionComponent<Props> = ({
  size = 'md',
  fontWeight = 'regular',
  color = 'primary',
  ...props
}) => (
  <StyledDynamicTypography
    {...props}
    $size={size}
    $fontWeight={fontWeight}
    $color={color}
  />
);

const DynamicTypography: FunctionComponent<
  Pick<Props, 'tag' | 'className' | 'children'>
> = ({ tag = 'span', children, ...props }) =>
  createElement(tag, props, children);

const StyledDynamicTypography = styled(DynamicTypography)<{
  $size: Size;
  $fontWeight: Weight;
  $color: Color;
}>`
  font-size: ${({ $size, theme }) => theme.fonts.size[$size]};
  line-height: ${({ $size, theme }) => theme.fonts.lineHeight[$size]};
  font-weight: ${({ $fontWeight, theme }) => theme.fonts.weight[$fontWeight]};
  color: ${({ $color, theme }) => theme.colors.text[$color]};
`;
