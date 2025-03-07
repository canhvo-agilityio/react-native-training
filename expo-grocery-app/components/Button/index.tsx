import { PropsWithChildren, ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
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
};

const Button = ({
  variant = 'primary',
  size = 'full',
  isLoading,
  title,
  disabled = false,
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      style={[
        styles.button,
        buttonVariants[variant],
        buttonSizes[size],
        (disabled || isLoading) && styles.disabled,
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
