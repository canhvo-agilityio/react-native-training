import { StyleSheet, View } from 'react-native';

// Components
import { Button } from '@/components';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AppStackScreenProps } from '@/interfaces';

type RegisterScreenProps = AppStackScreenProps<typeof SCREENS.REGISTER>;

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  return (
    <View style={styles.container}>
      <Button onPress={navigation.goBack}>Back to Login</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
