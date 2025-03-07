import { StyleSheet, TextStyle } from 'react-native';

// Themes
import {
  fontWeights as baseFontWeights,
  fontSizes as baseFontSizes,
  colors as baseColors,
  lineHeights,
  fontsFamily,
} from '@/themes';

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
