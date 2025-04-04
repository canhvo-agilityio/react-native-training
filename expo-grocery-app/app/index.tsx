import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores';

const Screen = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auths)" />
  );
};
export default Screen;
