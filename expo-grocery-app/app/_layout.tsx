// import '../wdyr.ts';
import { colors } from '@/themes';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NetworkProvider } from '@/providers';

import { useAuthStore } from '@/stores';
import { API_URL, ENDPOINTS } from '@/constants';
import { get } from '@/utils';

const LazyToast = lazy(() => import('react-native-toast-message'));

const PerformanceProfiler = __DEV__
  ? require('@shopify/react-native-performance').PerformanceProfiler
  : null;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
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
        await Font.loadAsync({
          Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        });

        if (isAuthenticated) {
          await queryClient.prefetchQuery({
            queryKey: [ENDPOINTS.NEW_PRODUCTS],
            queryFn: () => get(`${API_URL.BASE_URL}${ENDPOINTS.NEW_PRODUCTS}`),
          });
        }
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
      await SplashScreen.hideAsync();
    }
  };

  if (!appIsReady) {
    return null;
  }

  const appContent = (
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

  return __DEV__ ? (
    <PerformanceProfiler onReportPrepared={onReportPrepared}>
      {appContent}
    </PerformanceProfiler>
  ) : (
    appContent
  );
}
