import { View } from 'react-native';
import Input from '@/components/Input';
import { Show } from '@/components/icons';

export const LoginScreen = () => {
  return (
    <View>
      <Input value="" onChangeText={() => {}} />
      <Input variant="filled" value="" onChangeText={() => {}} />
      <Input
        label="Label"
        onPressIcon={() => {}}
        value=""
        onChangeText={() => {}}
        icon={<Show />}
        // placeholder="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      />
    </View>
  );
};
