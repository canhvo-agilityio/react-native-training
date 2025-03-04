const green = {
  green1: '#13B58C',
  green2: '#33907C',
};

const gray = {
  gray1: '#DCDDDF',
  gray2: '#4F4F4F',
  gray3: '#4A4A4A',
};

const white = {
  white1: '#FFFFFF',
  white2: '#F6F9FF',
};

const black = {
  black1: '#000000',
};

const red = {
  red1: '#FF7272',
};

const baseColors = {
  ...green,
  ...gray,
  ...white,
  ...black,
  ...red,
} as const;

const text = {
  primary: baseColors.gray2,
  secondary: baseColors.gray3,
  tertiary: baseColors.black1,
  error: baseColors.red1,
};

const border = {
  borderPrimary: baseColors.gray1,
};

const background = {
  primary: baseColors.green2,
  secondary: baseColors.white1,
  tertiary: baseColors.white2,
};

const button = {
  primary: baseColors.green2,
  secondary: baseColors.white1,
};

export const colors = {
  transparent: 'transparent',
  primary: baseColors.green2,
  secondary: baseColors.green1,
  background,
  text,
  border,
  button,
};
