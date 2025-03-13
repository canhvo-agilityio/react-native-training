import Svg, { Path } from 'react-native-svg';
import { IconProps } from '@/interfaces';

const PlushIcon = ({
  width = 19,
  height = 19,
  color = '#000000',
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 19 19" fill="none">
    <Path
      d="M10.8516 10.8443V19H8.1763V10.8443H0.277832V8.20047H8.1763V0H10.8516V8.20047H18.7501V10.8443H10.8516Z"
      fill={color}
      fillOpacity={0.2}
    />
  </Svg>
);

export default PlushIcon;
