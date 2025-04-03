import { colors } from '@/themes';
import { loadAsync } from 'expo-font';
import { Stack } from 'expo-router';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NetworkProvider } from '@/providers';

import { useAuthStore } from '@/stores';

const LazyToast = lazy(() => import('react-native-toast-message'));

// Prevent the splash screen from auto-hiding before asset loading is complete.
preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    async function prepare() {
      try {
        await loadAsync({
          Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [isAuthenticated]);

  const onLayoutRootView = async () => {
    if (appIsReady) {
      await hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkProvider queryClient={queryClient}>
        <ClickOutsideProvider>
          <ActionSheetProvider>
            <SafeAreaView
              style={{ flex: 1, backgroundColor: colors.primary }}
              onLayout={onLayoutRootView}
            >
              <StatusBar
                backgroundColor={colors.primary}
                barStyle="light-content"
                translucent
              />
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
              <Suspense fallback={null}>
                <LazyToast />
              </Suspense>
            </SafeAreaView>
          </ActionSheetProvider>
        </ClickOutsideProvider>
      </NetworkProvider>
    </QueryClientProvider>
  );
}
