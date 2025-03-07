import {
  colors,
  fontsFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  spacing,
} from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputBase: {
    paddingVertical: spacing[3],
  },
  icon: {
    position: 'absolute',
    left: spacing[3],
    top: spacing[4],
  },
  errorMessage: {
    color: colors.text.error,
    position: 'absolute',
    bottom: -spacing[4],
    marginLeft: spacing[2],
  },
  disabled: {
    opacity: 0.7,
  },
});

export const inputVariants = StyleSheet.create({
  filled: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.regular,
    paddingLeft: spacing[10],
    backgroundColor: colors.white1,
    borderRadius: radius[6],
    color: colors.gray2,
  },
  outlined: {
    fontSize: fontSizes.md,
    fontFamily: fontsFamily.regular,
    backgroundColor: colors.transparent,
    borderWidth: spacing.px,
    borderColor: colors.white1,
    paddingHorizontal: spacing[2],
    color: colors.white1,
    borderRadius: radius[6],
  },
  flushed: {
    fontSize: fontSizes.sm,
    fontFamily: fontsFamily.semiBold,
    borderBottomWidth: spacing.px,
    borderBottomColor: colors.border.borderSecondary,
    color: colors.gray2,
  },
});

export const placeHolderTextColors = {
  filled: colors.gray2,
  outlined: colors.white1,
  flushed: colors.gray2,
};

// export const buttonSizes = StyleSheet.create({
//   full: {
//     width: '100%',
//     paddingVertical: spacing[4],
//   },
//   sm: {
//     paddingHorizontal: spacing[8],
//     paddingVertical: spacing[2],
//   },
//   md: {
//     paddingHorizontal: spacing[14],
//     paddingVertical: spacing[4],
//   },
// });

// export const buttonTextStyle = StyleSheet.create({
//   primary: {
//     color: colors.text.light,
//   },
//   secondary: {
//     color: colors.text.primary,
//   },
//   outlined: {
//     color: colors.text.light,
//   },
//   reversal: {
//     color: colors.text.primary,
//   },
// });

// export const buttonTextSize = StyleSheet.create({
//   full: {
//     fontWeight: fontWeights.semiBold,
//     fontSize: fontSizes.md,
//     lineHeight: lineHeights.md,
//   },
//   sm: {
//     fontSize: fontSizes.xs,
//   },
//   md: {
//     fontSize: fontSizes.md,
//     fontWeight: fontWeights.semiBold,
//   },
// });
