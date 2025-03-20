import React, { forwardRef, LegacyRef } from 'react';
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { styles, inputVariants, placeHolderTextColors } from './styles';
import { InputVariants } from '@/interfaces';
import { Text } from '@/components/Text';

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
