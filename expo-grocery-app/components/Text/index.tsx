import { memo, PropsWithChildren } from 'react';
import {
  Text as BaseText,
  TextProps as TextBaseProps,
  ColorValue,
  TextStyle,
  StyleProp,
} from 'react-native';

// interfaces
import { TextFontSizes, TextVariants } from '@/interfaces';

// styles
import { textVariant, fontSizes } from './styles';

type TextProps = PropsWithChildren<TextBaseProps> & {
  variant?: TextVariants;
  size?: TextFontSizes;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
};

export const Text = ({
  children,
  color,
  size = 'md',
  variant = 'default',
  style,
  ...props
}: TextProps) => (
  <BaseText
    style={[
      textVariant[variant],
      fontSizes[size],
      style,
      { ...(color && { color }) },
    ]}
    {...props}
  >
    {children}
  </BaseText>
);

export default memo(Text);
