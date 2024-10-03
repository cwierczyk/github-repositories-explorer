import styled from '@emotion/styled';

import { type FunctionComponent } from '@/types';

interface Props {
  icon: string;
  size?: string;
  color?: string;
  className?: string;
}

export const Icon: FunctionComponent<Props> = ({
  icon,
  size = '1.5rem',
  color = 'currentColor',
  ...props
}) => (
  <StyledIcon {...props} role="img" $size={size} $icon={icon} $color={color} />
);

const StyledIcon = styled.span<{
  $size: string;
  $icon: string;
  $color: string;
}>`
  display: block;
  min-height: ${({ $size }) => $size};
  min-width: ${({ $size }) => $size};
  mask-image: ${({ $icon }) => `url('${$icon}')`};
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: ${({ $color }) => $color};
`;
