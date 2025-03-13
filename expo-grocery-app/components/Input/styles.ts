import { colors, fontsFamily, fontSizes, radius, spacing } from '@/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputBase: {
    paddingVertical: spacing[4],
  },
  leftIcon: {
    position: 'absolute',
    left: spacing[3],
    top: spacing[5],
  },
  rightIcon: {
    position: 'absolute',
    right: spacing[3],
    top: spacing[4],
  },
  errorMessage: {
    color: colors.text.error,
    position: 'absolute',
    bottom: -spacing[5],
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
  filled: colors.gray1,
  outlined: colors.white1,
  flushed: colors.gray2,
};
