import Svg, { Path } from 'react-native-svg';
import { IconProps } from '@/interfaces';

const LocationIcon = ({
  width = 11,
  height = 14,
  color = '#ffffff',
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 11 14" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.666748 5.3335C0.666748 2.57206 2.90532 0.333496 5.66675 0.333496C8.42818 0.333496 10.6667 2.57206 10.6667 5.3335C10.6667 7.34946 9.9644 7.91243 6.1806 13.3978C5.93229 13.7565 5.40118 13.7565 5.15289 13.3978C1.36909 7.91243 0.666748 7.34946 0.666748 5.3335ZM7.75008 5.3335C7.75008 4.1829 6.81735 3.25016 5.66675 3.25016C4.51615 3.25016 3.58341 4.1829 3.58341 5.3335C3.58341 6.48409 4.51615 7.41683 5.66675 7.41683C6.81735 7.41683 7.75008 6.48409 7.75008 5.3335Z"
      fill={color}
    />
  </Svg>
);

export default LocationIcon;
