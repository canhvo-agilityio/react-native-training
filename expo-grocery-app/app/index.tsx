import { Redirect } from 'expo-router';
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
