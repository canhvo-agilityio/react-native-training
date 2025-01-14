import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/types';
import { colors } from '@/themes';

export const Favorite = ({
  width = 24,
  height = 24,
  isActive = false,
  color = colors.border.quinary,
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4.9972 21.2499H4.99696C4.91804 21.2499 4.86597 21.2156 4.84061 21.1813C4.79355 21.1175 4.75 21.0185 4.75 20.8638V3.69774C4.75 3.2668 5.21468 2.75 5.8818 2.75H18.1849C18.8157 2.75 19.25 3.23343 19.25 3.69774V20.8639C19.25 21.1034 19.1815 21.1879 19.1626 21.2076C19.1408 21.2303 19.1058 21.25 19.0466 21.25C18.9832 21.25 18.8607 21.2254 18.6658 21.0684L18.6651 21.0679L13.1799 16.6616C12.8548 16.3997 12.4369 16.2799 12.0414 16.2799C11.6469 16.2799 11.2286 16.3991 10.9037 16.6605C10.9034 16.6607 10.9031 16.661 10.9028 16.6612L5.40009 21.0679L5.39836 21.0693C5.21683 21.2155 5.0733 21.2499 4.9972 21.2499Z"
      stroke={isActive ? 'none' : color}
      fill={isActive ? colors.background.primary : 'none'}
      stroke-width="1.5"
    />
  </Svg>
);
