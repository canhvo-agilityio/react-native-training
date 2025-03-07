import { SafeAreaView, Text } from 'react-native';
import Constants from 'expo-constants';
import Storybook from '../../.storybook';
import Input from '@/components/Input';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: '#33907C', flex: 1 }}>
      <Text>Home Screen</Text>
      <Input
        value="text"
        onChangeText={function (text: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </SafeAreaView>
  );
}

// export default Constants.expoConfig?.extra?.storybookEnabled
//   ? Storybook
//   : HomeScreen;
