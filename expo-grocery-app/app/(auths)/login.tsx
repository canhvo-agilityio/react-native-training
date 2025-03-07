import { Button, Hidden, Input, Show, Text } from '@/components';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ERROR_MESSAGES } from '@/constants';
import { checkEmail } from '@/utils';
import { colors, fontsFamily, fontSizes, fontWeights, spacing } from '@/themes';
import { useAuth } from '@/hooks';
import { useState } from 'react';

export interface ILoginForm {
  email: string;
  password: string;
}

export type LoginFormField = Exclude<keyof ILoginForm, ''>;

export default function HomeScreen() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { control, clearErrors, handleSubmit } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn, isLoading, error } = useAuth();

  const handleToggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  /**
   * Handle login
   * @param data email and password value
   */
  const handleLogin = (data: ILoginForm) => {
    signIn(
      { email: data.email, password: data.password },
      {
        onSuccess: (user) => {
          //TODO
          console.log('success: ', user);
        },
        onError: (err) => {
          //TODO
          console.log('error: ', err);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="title" size="xl" style={styles.title}>
        Welcome to tradly
      </Text>
      <Text size="sm" style={styles.description}>
        Login to your account
      </Text>
      <View style={styles.inputGroup}>
        {error && (
          <Text size="base" variant="error" style={styles.errorMessages}>
            {error}
          </Text>
        )}
        <Controller
          key="email"
          control={control}
          name="email"
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
            validate: (value: string) => checkEmail(value),
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              variant="outlined"
              placeholder="Email/Mobile Number"
              value={value}
              disabled={isLoading}
              errorMessage={error?.message}
              onChangeText={(data) => {
                clearErrors('email');
                onChange(data);
              }}
            />
          )}
        />
        <Controller
          key="password"
          control={control}
          name="password"
          rules={{
            required: ERROR_MESSAGES.FIELD_REQUIRED,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              variant="outlined"
              placeholder="Password"
              value={value}
              disabled={isLoading}
              rightIcon={isShowPassword ? <Hidden /> : <Show />}
              errorMessage={error?.message}
              secureTextEntry={!isShowPassword}
              onPressRightIcon={handleToggleShowPassword}
              onChangeText={(data) => {
                clearErrors('password');
                onChange(data);
              }}
            />
          )}
        />
      </View>
      <Button
        variant="secondary"
        title="Login"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit(handleLogin)}
      />
      <Link style={styles.forgotPassword} href="/login">
        Forgot your password?
      </Link>
      <View style={styles.signUpGroup}>
        <Text style={styles.signUpDes}>Don’t have an account?</Text>
        <Link href="/login" style={styles.signUpLink}>
          Sign up
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
  },
  title: {
    marginBottom: spacing[12],
    textAlign: 'center',
    color: colors.text.light,
  },
  description: {
    marginBottom: spacing[10],
    textAlign: 'center',
    color: colors.text.light,
  },

  inputGroup: {
    gap: spacing[6],
    marginBottom: spacing[10],
  },
  forgotPassword: {
    color: colors.text.light,
    fontSize: fontSizes.md,
    textAlign: 'center',
    marginTop: spacing[10],
    marginBottom: spacing[14],
  },

  signUpGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  signUpDes: {
    color: colors.text.light,
  },

  signUpLink: {
    color: colors.text.light,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    fontFamily: fontsFamily.bold,
  },
  errorMessages: {
    position: 'absolute',
    top: -spacing[5],
  },
});
