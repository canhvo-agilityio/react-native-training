import { ReactNode, memo } from 'react';
import { ColorValue, Text as RNText, StyleProp, TextStyle } from 'react-native';

// Themes
import { textSizes, textVariants } from '@/themes';

// Types
import { TextSizeTypes, TextVariantTypes } from '@/types';

export interface TextProps {
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
}: TextProps) => (
  <RNText
    style={[
      textVariants[variant],
      textSizes[size],
      style,
      { ...(color && { color }) },
    ]}>
    {value}
  </RNText>
);

export default memo(Text);
