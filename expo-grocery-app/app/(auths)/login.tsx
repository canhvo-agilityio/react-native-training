import { Button, Hidden, Input, Show, Text } from '@/components';
import { Link, router } from 'expo-router';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ERROR_MESSAGES, ROUTES } from '@/constants';
import { checkEmail } from '@/utils';
import { colors, fontsFamily, fontSizes, fontWeights, spacing } from '@/themes';
import { useAuth } from '@/hooks';
import { useCallback, useRef, useState } from 'react';
import { useAuthStore } from '@/stores';
import Toast from 'react-native-toast-message';

export interface LoginForm {
  email: string;
  password: string;
}

export type LoginFormField = Exclude<keyof LoginForm, ''>;

export default function HomeScreen() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { control, clearErrors, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn, isLoading } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);

  const handleToggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const passwordInputRef = useRef<TextInput | null>(null);

  const handleSubmitEditingEmail = useCallback(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, []);

  const handleLogin = (data: LoginForm) => {
    signIn(
      { email: data.email, password: data.password },
      {
        onSuccess: (user) => {
          setUser(user);
          router.replace(ROUTES.HOME);
        },
        onError: (err) => {
          Toast.show({
            type: 'error',
            text1: 'Login failed',
            text2: err.message,
          });
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text variant="title" size="xl" style={styles.title}>
            Test Preview ABC
          </Text>
          <Text size="sm" style={styles.description}>
            Login to your account
          </Text>
          <View style={styles.inputGroup}>
            <Controller
              key="email"
              control={control}
              name="email"
              rules={{
                required: ERROR_MESSAGES.FIELD_REQUIRED,
                validate: (value: string) => checkEmail(value),
              }}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  variant="outlined"
                  placeholder="Email/Mobile Number"
                  value={value}
                  disabled={isLoading}
                  errorMessage={error?.message}
                  onSubmitEditing={handleSubmitEditingEmail}
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
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  variant="outlined"
                  placeholder="Password"
                  value={value}
                  disabled={isLoading}
                  ref={passwordInputRef}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
});
