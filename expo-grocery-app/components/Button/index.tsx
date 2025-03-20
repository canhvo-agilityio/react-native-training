import { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { ButtonSizes, ButtonVariants } from '@/interfaces';
import {
  colors,
  fontsFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
} from '@/themes';

type ButtonProps = PropsWithChildren<PressableProps> & {
  title: string;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Button = ({
  variant = 'primary',
  size = 'full',
  isLoading,
  title,
  disabled = false,
  icon,
  style,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonVariants[variant],
        buttonSizes[size],
        (disabled || isLoading) && styles.disabled,
        pressed && styles.pressed, // Thêm hiệu ứng khi nhấn
        style,
      ]}
      disabled={disabled || isLoading}
      {...rest}
    >
      {icon}
      <Text
        style={[styles.text, buttonTextStyle[variant], buttonTextSize[size]]}
      >
        {title}
      </Text>
      {isLoading && <ActivityIndicator testID="loading-indicator" />}
    </Pressable>
  );
};

export default Button;

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
