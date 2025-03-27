// Icon
export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  isActive?: boolean;
  onPress?: () => void;
}

// Text
export type TextVariants = 'heading' | 'title' | 'error' | 'default';
export type TextFontSizes = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';

// Button
export type ButtonVariants = 'primary' | 'secondary' | 'outlined' | 'reversal';
export type ButtonSizes = 'full' | 'sm' | 'md' | 'lg';

//Input
export type InputVariants = 'filled' | 'outlined' | 'flushed';

// Select
export interface SelectOption {
  title: string;
  value: string;
}
