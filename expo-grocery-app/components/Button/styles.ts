import {
  colors,
  fontsFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
} from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: spacing[2],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing[6],
  },
  text: {
    fontFamily: fontsFamily.regular,
  },
  disabled: {
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.5,
  },
});

export const buttonVariants = StyleSheet.create({
  primary: {
    backgroundColor: colors.button.primary,
  },
  secondary: {
    backgroundColor: colors.white1,
  },
  outlined: {
    backgroundColor: colors.transparent,
    borderWidth: spacing.px,
    borderColor: colors.text.light,
  },
  reversal: {
    backgroundColor: colors.transparent,
    borderWidth: spacing.px,
    borderColor: colors.text.primary,
  },
});

export const buttonSizes = StyleSheet.create({
  full: {
    width: '100%',
    paddingVertical: spacing[4],
  },
  sm: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[2],
  },
  md: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2.5],
  },
  lg: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
});

export const buttonTextStyle = StyleSheet.create({
  primary: {
    color: colors.text.light,
  },
  secondary: {
    color: colors.text.primary,
  },
  outlined: {
    color: colors.text.light,
  },
  reversal: {
    color: colors.text.primary,
  },
});

export const buttonTextSize = StyleSheet.create({
  full: {
    fontFamily: fontsFamily.semiBold,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  sm: {
    fontSize: fontSizes.xs,
  },
  md: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontFamily: fontsFamily.medium,
    fontWeight: fontWeights.medium,
  },
  lg: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.semiBold,
    fontWeight: fontWeights.semiBold,
  },
});
