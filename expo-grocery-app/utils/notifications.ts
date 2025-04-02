import { isDevice } from 'expo-device';
import {
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler,
  getPermissionsAsync,
  scheduleNotificationAsync,
  AndroidImportance,
  SchedulableTriggerInputTypes,
} from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { openSettings } from 'expo-linking';

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await requestPermissionsAsync();
    await setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!isDevice) return;

  const { status: existingStatus } = await getPermissionsAsync();
  if (existingStatus !== 'granted') {
    await requestPermissionsAsync();
  }
};

export const setupNotificationHandler = () => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export async function scheduleNotification(
  title: string,
  body: string,
  actionType: string,
  actionData?: any,
  delaySeconds?: number,
) {
  await scheduleNotificationAsync({
    content: {
      title,
      body,
      data: {
        actionType,
        actionData,
      },
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delaySeconds || 2,
    },
  });
}

export const checkAndRequestNotificationPermission = async () => {
  const { status } = await getPermissionsAsync();

  if (status !== 'granted') {
    return new Promise((resolve) => {
      Alert.alert(
        'You have not granted permission to receive notifications',
        'Please go to Settings to re-enable permissions.',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
          {
            text: 'Open Settings',
            onPress: () => {
              openSettings();
              resolve(false);
            },
          },
        ],
      );
    });
  }

  return true;
};
