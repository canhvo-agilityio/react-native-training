import { checkEmail } from '../validation';
import { ERROR_MESSAGES } from '@/constants';

describe('checkEmail', () => {
  it('should return undefined for a valid email', () => {
    const validEmail = 'test@example.com';
    const result = checkEmail(validEmail);
    expect(result).toBeUndefined();
  });

  it('should return an error message for an invalid email', () => {
    const invalidEmail = 'invalid-email';
    const result = checkEmail(invalidEmail);
    expect(result).toBe(ERROR_MESSAGES.EMAIL);
  });

  it('should return an error message for an empty string', () => {
    const emptyEmail = '';
    const result = checkEmail(emptyEmail);
    expect(result).toBe(ERROR_MESSAGES.EMAIL);
  });

  it('should return an error message for an email with spaces', () => {
    const emailWithSpaces = 'test @example.com';
    const result = checkEmail(emailWithSpaces);
    expect(result).toBe(ERROR_MESSAGES.EMAIL);
  });
});
