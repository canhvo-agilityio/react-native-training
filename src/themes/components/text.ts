import { StyleSheet } from 'react-native';
import { fontSizes, fontFamilies } from '../typography';
import { colors } from '../color';

export const textVariants = StyleSheet.create({
  heading: {
    fontFamily: fontFamilies.MerriweatherBold,
    color: colors.text.primary,
  },

  title: {
    fontFamily: fontFamilies.NunitoSansSemiBold,
    color: colors.text.primary,
  },

  description: {
    fontFamily: fontFamilies.NunitoSansRegular,
    color: colors.text.tertiary,
  },

  default: {
    fontFamily: fontFamilies.NunitoSansRegular,
    color: colors.text.secondary,
  },
});

export const textSizes = StyleSheet.create({
  xs: {
    fontSize: fontSizes.xs,
  },

  sm: {
    fontSize: fontSizes.sm,
  },

  md: {
    fontSize: fontSizes.md,
  },

  lg: {
    fontSize: fontSizes.lg,
  },

  xl: {
    fontSize: fontSizes.xl,
  },

  '2xl': {
    fontSize: fontSizes['2xl'],
  },

  '3xl': {
    fontSize: fontSizes['3xl'],
  },
});
