import { memo } from 'react';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';

//Type
import { ButtonSizeTypes, ButtonVariantTypes } from '@/types';
import {
  buttonSizes,
  buttonTextSize,
  buttonTextStyle,
  buttonVariants,
  colors,
} from '@/themes';
export interface ButtonProps {
  text: string;
  disabled?: boolean;
  variant?: ButtonVariantTypes;
  size?: ButtonSizeTypes;
  isLoading?: boolean;
  onPress?: () => void;
}

const Button = ({
  text,
  variant = 'solid',
  size = 'md',
  disabled,
  isLoading,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        buttonSizes[size],
        buttonVariants[variant],
        (disabled || isLoading) && { opacity: 0.7 },
        { alignSelf: 'flex-start' },
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      <Text
        style={[
          buttonTextStyle.baseStyle,
          buttonTextStyle[variant],
          buttonTextSize[size],
        ]}>
        {text}
      </Text>
      {isLoading && (
        <ActivityIndicator size="small" color={colors.common.white} />
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
