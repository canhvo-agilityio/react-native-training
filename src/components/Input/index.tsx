import { InputVariantTypes } from '@/types';
import { TextInput, View } from 'react-native';
import Text from '../Text';
import { colors, inputBaseStyle, inputVariants } from '@/themes';
import { memo } from 'react';

export interface InputProps {
  value: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  variant?: InputVariantTypes;
  disabled?: boolean;
  onChangeText: (text: string) => void;
}

const Input = ({
  value,
  placeholder,
  label,
  variant = 'flushed',
  errorMessage,
  disabled,
  onChangeText,
}: InputProps) => (
  <View style={[inputVariants[variant]]}>
    {label && (
      <Text
        value={label}
        variant="description"
        color={colors.text.quaternary}
      />
    )}
    <TextInput
      value={value}
      placeholder={placeholder}
      editable={!disabled}
      onChangeText={onChangeText}
      style={[inputBaseStyle]}
    />
    {errorMessage && <Text value={errorMessage} />}
  </View>
);

export default memo(Input);
