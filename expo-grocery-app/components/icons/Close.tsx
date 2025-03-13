import Svg, { Path, Mask, G, Rect, Defs, ClipPath } from 'react-native-svg';
import { IconProps } from '@/interfaces';

const CloseIcon = ({
  width = 20,
  height = 20,
  color = '#ffffff',
}: IconProps) => (
  <Svg width={width} height={height} viewBox="0 0 11 11" fill="none">
    <Path
      d="M6.43424 5.50008L10.1076 9.17341L9.17341 10.1076L5.50008 6.43424L1.82674 10.1076L0.892578 9.17341L4.56591 5.50008L0.892578 1.82674L1.82674 0.892578L5.50008 4.56591L9.17341 0.892578L10.1076 1.82674L6.43424 5.50008Z"
      fill={color}
    />
  </Svg>
);

export default CloseIcon;
