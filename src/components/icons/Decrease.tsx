import Svg, { Rect } from 'react-native-svg';

import { IconProps } from '@/types';

export const Decrease = ({
  width = 14,
  height = 2,
  color = '#242424',
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 14 2" fill="none">
    <Rect width="14" height="2" rx="1" fill={color} />
  </Svg>
);
