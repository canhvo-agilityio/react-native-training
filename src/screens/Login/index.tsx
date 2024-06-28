import Config from 'react-native-config';
import { StyleSheet, Text, View } from 'react-native';

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>{`We are running on ${Config.ENVIRONMENT}`}</Text>
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
