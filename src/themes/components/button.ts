import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../color';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from '../typography';

export const flexStyle: ViewStyle = {
  flexDirection: 'row',
  gap: 10,
  justifyContent: 'center',
};

export const buttonVariants = StyleSheet.create({
  solid: {
    backgroundColor: colors.primary,
    ...flexStyle,
  },
  text: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignSelf: 'baseline',
  },
});

export const buttonSizes = StyleSheet.create({
  md: {
    paddingHorizontal: 29,
    paddingVertical: 15,
    borderRadius: 4,
  },

  lg: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
  },

  xl: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export const buttonTextStyle = StyleSheet.create({
  baseStyle: {
    textAlign: 'center',
    fontFamily: fontFamilies.NunitoSansSemiBold,
    fontWeight: fontWeights.semiBold,
  },

  solid: {
    color: colors.common.white,
  },

  text: {
    color: colors.text.primary,
  },
});

export const buttonTextSize = StyleSheet.create({
  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.lg,
  },

  lg: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.lg,
  },

  xl: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
  },
});
