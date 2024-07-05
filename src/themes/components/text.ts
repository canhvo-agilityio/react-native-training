import { StyleSheet } from 'react-native';
import { fontSizes, fontFamilies } from '../typography';
import { colors } from '../color';

export const textVariants = StyleSheet.create({
  heading: {
    fontFamily: fontFamilies.MerriweatherBold,
    color: colors.text.primary,
  },

  subHeading: {
    fontFamily: fontFamilies.MerriweatherRegular,
    color: colors.text.quaternary,
  },

  title: {
    fontFamily: fontFamilies.GelasioBold,
    color: colors.text.primary,
  },

  subTitle: {
    fontFamily: fontFamilies.GelasioSemiBold,
    color: colors.text.secondary,
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

  xmd: {
    fontSize: fontSizes.xmd,
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
