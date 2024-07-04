import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types';
import { colors } from '@/themes';

export const User = ({
  width = 24,
  height = 24,
  isActive = false,
  color = colors.border.quinary,
}: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={isActive ? colors.background.primary : color}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9Z"
      fill={isActive ? colors.background.primary : 'none'}
      stroke={isActive ? 'none' : color}
    />
  </Svg>
);
