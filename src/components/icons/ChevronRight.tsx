import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types';

export const ChevronRight = ({
  width = 24,
  height = 24,
  color = '#242424',
  onPress,
}: IconProps) => (
  <TouchableOpacity testID="chevron-right-icon" onPress={onPress}>
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18l6-6-6-6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </TouchableOpacity>
);
