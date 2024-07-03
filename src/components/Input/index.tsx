import React, { memo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { InputVariantTypes } from '@/types';
import Text from '../Text';
import { colors, inputBaseStyle, inputVariants } from '@/themes';

export interface InputProps {
  value: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  variant?: InputVariantTypes;
  disabled?: boolean;
  icon?: React.JSX.Element;
  onChangeText: (text: string) => void;
  onPressIcon?: () => void;
}

const Input = ({
  value,
  placeholder,
  label,
  variant = 'flushed',
  errorMessage,
  disabled,
  icon,
  onChangeText,
  onPressIcon,
}: InputProps) => {
  return (
    <View style={[inputVariants[variant]]}>
      {label && (
        <Text
          value={label}
          variant="description"
          color={colors.text.quaternary}
        />
      )}
      <View style={styles.flex}>
        <TextInput
          value={value}
          placeholder={placeholder}
          editable={!disabled}
          onChangeText={onChangeText}
          style={[inputBaseStyle]}
        />
        {icon && onPressIcon ? (
          <TouchableOpacity testID="icon" onPress={onPressIcon}>
            {icon}
          </TouchableOpacity>
        ) : (
          icon
        )}
      </View>
      {errorMessage && <Text value={errorMessage} />}
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 27,
    alignItems: 'center',
    gap: 14,
  },
});
