import { Redirect } from 'expo-router';
import Constants from 'expo-constants';
import Storybook from '../.storybook';
import { useAuthStore } from '@/stores';

const Screen = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auths)" />
  );
};
export default Screen;

// export default Constants.expoConfig?.extra?.storybookEnabled
//   ? Storybook
//   : Screen;
