const green = {
  green1: '#13B58C',
  green2: '#33907C',
};

const gray = {
  gray1: '#DCDDDF',
  gray2: '#4F4F4F',
  gray3: '#4A4A4A',
  gray4: '#DBDBDE',
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
  default: baseColors.gray2,
  primary: baseColors.green1,
  secondary: baseColors.gray3,
  tertiary: baseColors.black1,
  error: baseColors.red1,
  light: baseColors.white1,
  dark: baseColors.black1,
};

const border = {
  borderPrimary: baseColors.gray1,
  borderSecondary: baseColors.gray4,
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
  ...baseColors,
  transparent: 'transparent',
  primary: baseColors.green2,
  secondary: baseColors.green1,
  background,
  text,
  border,
  button,
};
