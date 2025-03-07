import React, { forwardRef, LegacyRef } from 'react';
import { TextInput, View } from 'react-native';
import { styles, inputVariants, placeHolderTextColors } from './styles';
import { InputVariants } from '@/interfaces';
import { Text } from '@/components/Text';

interface InputProps {
  value: string;
  placeholder?: string;
  variant?: InputVariants;
  label?: string;
  icon?: React.JSX.Element;
  disabled?: boolean;
  errorMessage?: string;
  ref?: LegacyRef<TextInput>;
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
      icon,
      errorMessage,
      disabled,
      onChangeText,
      onSubmitEditing,
    }: InputProps,
    ref?: LegacyRef<TextInput>,
  ) => {
    return (
      <View>
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
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        {icon && <View style={styles.icon}>{icon}</View>}
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
