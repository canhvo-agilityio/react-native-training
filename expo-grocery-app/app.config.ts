// filepath: /d:/react-native-training/expo-grocery-app/app.config.ts
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Grocery',
  slug: 'grocery',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.duccanh2810.expo_grocery_app',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#33907C',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    storybookEnabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
  },
});
