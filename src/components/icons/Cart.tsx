import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types';
import { TouchableOpacity } from 'react-native';

export const Cart = ({
  width = 24,
  height = 25,
  color = '#808080',
  onPress,
}: IconProps) => (
  <TouchableOpacity testID="cart-icon" activeOpacity={0.8} onPress={onPress}>
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.607 4.643A.643.643 0 013.25 4h1.928a.643.643 0 01.624.487l.52 2.084H21.25a.643.643 0 01.623.799l-1.928 7.714a.643.643 0 01-.624.487H7.75a.643.643 0 01-.624-.487l-2.45-9.798H3.25a.643.643 0 01-.643-.643zm4.037 3.214l1.607 6.429H18.82l1.607-6.429H6.644zm2.392 10.286a1.286 1.286 0 100 2.571 1.286 1.286 0 000-2.571zm-2.572 1.286a2.571 2.571 0 115.143 0 2.571 2.571 0 01-5.143 0zm11.572-1.286a1.286 1.286 0 100 2.571 1.286 1.286 0 000-2.571zm-2.572 1.286a2.571 2.571 0 115.143 0 2.571 2.571 0 01-5.143 0z"
        fill={color}
      />
    </Svg>
  </TouchableOpacity>
);
