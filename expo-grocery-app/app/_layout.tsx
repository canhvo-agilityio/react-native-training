import 'wdyr';
import { colors } from '@/themes';
import { loadAsync } from 'expo-font';
import { Stack } from 'expo-router';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useAuthStore } from '@/stores';

const LazyToast = lazy(() => import('react-native-toast-message'));

const PerformanceProfiler = __DEV__
  ? require('@shopify/react-native-performance').PerformanceProfiler
  : null;

const LazyActionSheetProvider = lazy(() =>
  import('@expo/react-native-action-sheet').then((module) => ({
    default: module.ActionSheetProvider,
  })),
);

const LazyClickOutsideProvider = lazy(() =>
  import('react-native-click-outside').then((module) => ({
    default: module.ClickOutsideProvider,
  })),
);

const LazyNetworkProvider = lazy(() =>
  import('@/providers').then((module) => ({ default: module.NetworkProvider })),
);

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

  const onReportPrepared = useCallback((report: any) => {
    if (__DEV__) {
      console.log(report);
    }
  }, []);

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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) {
      onLayoutRootView();
    }
  }, [appIsReady, onLayoutRootView]);

  const appContent = (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        <LazyNetworkProvider queryClient={queryClient}>
          <LazyClickOutsideProvider>
            <LazyActionSheetProvider>
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
                <LazyToast />
              </SafeAreaView>
            </LazyActionSheetProvider>
          </LazyClickOutsideProvider>
        </LazyNetworkProvider>
      </Suspense>
    </QueryClientProvider>
  );

  return __DEV__ ? (
    <PerformanceProfiler onReportPrepared={onReportPrepared}>
      {appContent}
    </PerformanceProfiler>
  ) : (
    appContent
  );
}
