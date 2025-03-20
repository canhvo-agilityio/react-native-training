import { colors } from '@/themes';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
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
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ClickOutsideProvider>
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
          <Toast />
        </SafeAreaView>
      </ClickOutsideProvider>
    </QueryClientProvider>
  );
}
