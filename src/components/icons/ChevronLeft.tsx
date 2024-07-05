import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types';
import { TouchableOpacity } from 'react-native';

export const ChevronLeft = ({
  width = 20,
  height = 20,
  color = '#242424',
  onPress,
}: IconProps) => (
  <TouchableOpacity onPress={onPress}>
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.25 4l-6.5 6.5 6.5 6.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);
