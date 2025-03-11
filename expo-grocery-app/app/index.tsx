import { Redirect } from 'expo-router';
import Constants from 'expo-constants';
import Storybook from '../.storybook';

const Screen = () => <Redirect href="/(tabs)" />;
export default Screen;

// export default Constants.expoConfig?.extra?.storybookEnabled
//   ? Storybook
//   : Screen;
