import { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';

import {
  buttonVariants,
  buttonSizes,
  styles,
  buttonTextStyle,
  buttonTextSize,
} from './styles';
import { ButtonSizes, ButtonVariants } from '@/interfaces';

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
      {isLoading && <ActivityIndicator />}
    </Pressable>
  );
};

export default Button;
