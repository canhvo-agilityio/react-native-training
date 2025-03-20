import { memo, PropsWithChildren } from 'react';
import {
  Text as BaseText,
  TextProps as TextBaseProps,
  ColorValue,
  TextStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

// Themes
import {
  fontWeights as baseFontWeights,
  fontSizes as baseFontSizes,
  colors as baseColors,
  lineHeights,
  fontsFamily,
} from '@/themes';

// interfaces
import { TextFontSizes, TextVariants } from '@/interfaces';

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

export const textVariant = StyleSheet.create({
  heading: {
    fontFamily: fontsFamily.bold,
    fontWeight: baseFontWeights.bold,
    color: baseColors.text.light,
  },
  title: {
    fontFamily: fontsFamily.medium,
    fontWeight: baseFontWeights.medium,
    color: baseColors.text.secondary,
  },
  error: {
    fontFamily: fontsFamily.regular,
    fontWeight: baseFontWeights.regular,
    color: baseColors.text.error,
  },
  default: {
    fontFamily: fontsFamily.regular,
    fontWeight: baseFontWeights.regular,
    color: baseColors.text.default,
  },
});

export const fontSizes = StyleSheet.create({
  xs: {
    fontSize: baseFontSizes.xs,
    lineHeight: lineHeights.xs,
  },
  sm: {
    fontSize: baseFontSizes.sm,
    lineHeight: lineHeights.lg,
  },
  base: {
    fontSize: baseFontSizes.base,
    lineHeight: lineHeights.base,
  },
  md: {
    fontSize: baseFontSizes.md,
    lineHeight: lineHeights.md,
  },
  lg: {
    fontSize: baseFontSizes.lg,
    lineHeight: lineHeights.sm,
  },
  xl: {
    fontSize: baseFontSizes.xl,
    lineHeight: lineHeights.xl,
  },
});
