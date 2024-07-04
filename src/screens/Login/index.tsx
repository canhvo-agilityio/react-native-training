import { StyleSheet, View } from 'react-native';
import { Chairs, Show } from '@/components/icons';
import { Text, Input, Button } from '@/components';
import { colors } from '@/themes';
import { useCallback, useState } from 'react';
import { SCREENS } from '@/constants';
import { AppStackScreenProps } from '@/interfaces';

export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
};

type LoginScreenProps = AppStackScreenProps<typeof SCREENS.LOGIN>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({
    email: undefined,
    password: undefined,
  });

  const validate = useCallback(() => {
    let valid = true;
    let errors: Record<string, string | undefined> = {
      email: undefined,
      password: undefined,
    };

    if (!email || !REGEX.EMAIL.test(email)) {
      errors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  }, [email, password]);

  const handleSubmit = useCallback(() => {
    if (validate()) {
      navigation.navigate(SCREENS.BOTTOM_TAB);
    }
  }, [navigation, validate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.divider} />
        <Chairs />
        <View style={styles.divider} />
      </View>
      <View style={styles.title}>
        <Text variant="subHeading" value="Hello !" size="2xl" />
        <Text variant="heading" value="WELCOME BACK" size="xl" />
      </View>
      <View style={styles.form}>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          errorMessage={errors.email}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          icon={<Show />}
          errorMessage={errors.password}
        />
        <View style={styles.action}>
          <Button text="Forgot password" variant="text" style={styles.link} />
          <Button text="Log in" size="lg" onPress={handleSubmit} />
          <Button text="SIGN UP" variant="text" style={styles.link} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.primary,
  },
  container: {
    gap: 30,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 21,
    overflow: 'hidden',
  },
  title: {
    paddingHorizontal: 30,
  },
  form: {
    paddingLeft: 30,
    paddingTop: 35,
    paddingBottom: 40,
    marginRight: 30,
    gap: 35,
    shadowColor: '#8A959E',
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 0.5,
    elevation: 7,
    backgroundColor: colors.common.white,
  },
  action: {
    paddingRight: 30,
    gap: 40,
  },
  link: {
    alignSelf: 'center',
  },
});
