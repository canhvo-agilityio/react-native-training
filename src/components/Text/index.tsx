import { ReactNode, memo } from 'react';
import {
  ColorValue,
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';

// Themes
import { textSizes, textVariants } from '@/themes';

// Types
import { TextSizeTypes, TextVariantTypes } from '@/types';

export interface TextProps extends RNTextProps {
  value: string | ReactNode;
  variant?: TextVariantTypes;
  size?: TextSizeTypes;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
}

const Text = ({
  value,
  variant = 'default',
  size = 'sm',
  color,
  style,
  ...props
}: TextProps) => (
  <RNText
    style={[
      textVariants[variant],
      textSizes[size],
      style,
      { ...(color && { color }) },
    ]}
    {...props}>
    {value}
  </RNText>
);

export default memo(Text);
