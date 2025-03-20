import React, { forwardRef, LegacyRef } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { InputVariants } from '@/interfaces';
import { Text } from '@/components/Text';
import { colors, fontsFamily, fontSizes, radius, spacing } from '@/themes';
import { StyleSheet } from 'react-native';

interface InputProps
  extends Omit<TextInputProps, 'style'>,
    Pick<ViewProps, 'style'> {
  value: string;
  placeholder?: string;
  variant?: InputVariants;
  label?: string;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  disabled?: boolean;
  errorMessage?: string;
  ref?: LegacyRef<TextInput>;
  secureTextEntry?: boolean;
  onPressRightIcon?: () => void;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

const Input = forwardRef(
  (
    {
      value,
      placeholder,
      variant = 'filled',
      label,
      leftIcon,
      rightIcon,
      errorMessage,
      disabled,
      secureTextEntry = false,
      onPressRightIcon,
      onChangeText,
      onSubmitEditing,
      style,
      ...props
    }: InputProps,
    ref?: LegacyRef<TextInput>,
  ) => {
    return (
      <View style={style}>
        {label && (
          <Text size="base" style={{ opacity: 0.5 }}>
            {label}
          </Text>
        )}
        <TextInput
          value={value}
          placeholder={placeholder}
          style={[
            styles.inputBase,
            inputVariants[variant],
            disabled && styles.disabled,
          ]}
          ref={ref}
          editable={!disabled}
          placeholderTextColor={placeHolderTextColors[variant]}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...props}
        />
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        {rightIcon &&
          (onPressRightIcon ? (
            <TouchableOpacity
              testID="icon"
              style={styles.rightIcon}
              onPress={onPressRightIcon}
            >
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View style={styles.rightIcon}>{rightIcon}</View>
          ))}

        {errorMessage && (
          <Text size="base" style={styles.errorMessage}>
            {errorMessage}
          </Text>
        )}
      </View>
    );
  },
);

Input.displayName = 'Input';

export default Input;

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
