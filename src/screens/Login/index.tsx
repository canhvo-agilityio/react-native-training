import { useCallback } from 'react';
import Config from 'react-native-config';
import { StyleSheet, Text, View } from 'react-native';

// Components
import { Button } from '@/components';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AppStackScreenProps } from '@/interfaces';

type LoginScreenProps = AppStackScreenProps<typeof SCREENS.LOGIN>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const handleRegister = useCallback(() => {
    navigation.navigate(SCREENS.REGISTER);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>{`We are running on ${Config.ENVIRONMENT}`}</Text>
      <Button onPress={handleRegister}>Register</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
});
