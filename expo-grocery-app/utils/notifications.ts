import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import * as Linking from 'expo-linking';

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    await Notifications.requestPermissionsAsync();
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
  }
};

export const setupNotificationHandler = () => {
  Notifications.setNotificationHandler({
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
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: {
        actionType,
        actionData,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: delaySeconds || 2,
    },
  });
}

export const checkAndRequestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();

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
              Linking.openSettings();
              resolve(false);
            },
          },
        ],
      );
    });
  }

  return true;
};
