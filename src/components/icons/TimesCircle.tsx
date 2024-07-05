import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types';
import { TouchableOpacity } from 'react-native';

export const TimesCircle = ({
  width = 20,
  height = 20,
  color = '#242424',
  onPress,
}: IconProps) => (
  <TouchableOpacity testID="cart-icon" activeOpacity={0.8} onPress={onPress}>
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-.256-11.088 2.533-2.533a.77.77 0 1 1 1.087 1.088L12.831 12l2.534 2.533a.77.77 0 0 1-1.088 1.088l-2.533-2.533L9.21 15.62a.77.77 0 1 1-1.088-1.088L10.656 12 8.123 9.467A.77.77 0 0 1 9.21 8.379l2.533 2.533ZM3.538 12a8.461 8.461 0 1 0 16.923 0 8.461 8.461 0 0 0-16.923 0Z"
        clipRule="evenodd"
      />
    </Svg>
  </TouchableOpacity>
);
