import { SafeAreaView, Text } from 'react-native';
import Constants from 'expo-constants';
import Storybook from '../../.storybook';
import Input from '@/components/Input';

export default function HomeScreen() {
  return <Text>Home Screen</Text>;
}

// export default Constants.expoConfig?.extra?.storybookEnabled
//   ? Storybook
//   : HomeScreen;
