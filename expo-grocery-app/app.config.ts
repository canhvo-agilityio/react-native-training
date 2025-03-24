// filepath: /d:/react-native-training/expo-grocery-app/app.config.ts
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Grocery',
  slug: 'grocery',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'groceryapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription:
        'This app uses the camera to scan barcodes on event tickets.',
    },
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
    [
      'expo-camera',
      {
        cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
        recordAudioAndroid: true,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: 'ce9c3a05-4740-4611-9d82-a95f8594d29b',
    },
  },
});
