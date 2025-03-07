import { ERROR_MESSAGES, REGEX } from '@/constants';

export const checkEmail = (value: string) => {
  if (!REGEX.EMAIL.test(value)) {
    return ERROR_MESSAGES.EMAIL;
  }
};
