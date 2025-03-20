import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import {
  registerForPushNotificationsAsync,
  setupNotificationHandler,
  scheduleNotification,
} from '../notifications';

jest.mock('expo-device', () => ({
  isDevice: true,
}));

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  AndroidImportance: {
    MAX: 'max',
  },
}));

jest.spyOn(global, 'alert').mockImplementation(() => {});

describe('notifications.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerForPushNotificationsAsync', () => {
    it('should set up notification channel for Android', async () => {
      Platform.OS = 'android';
      await registerForPushNotificationsAsync();

      expect(Notifications.setNotificationChannelAsync).toHaveBeenCalledWith(
        'myNotificationChannel',
        {
          name: 'A channel is needed for the permissions prompt to appear',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        },
      );
    });

    it('should return early if the device is not a physical device', async () => {
      (Device.isDevice as boolean) = false;
      await registerForPushNotificationsAsync();

      expect(Notifications.getPermissionsAsync).not.toHaveBeenCalled();
    });

    it('should request permissions if not already granted', async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValueOnce({
        status: 'denied',
      });
      (
        Notifications.requestPermissionsAsync as jest.Mock
      ).mockResolvedValueOnce({
        status: 'granted',
      });

      await registerForPushNotificationsAsync();

      expect(Notifications.getPermissionsAsync).toHaveBeenCalled();
      expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
    });

    it('should show an alert if permissions are not granted', async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValueOnce({
        status: 'denied',
      });
      (
        Notifications.requestPermissionsAsync as jest.Mock
      ).mockResolvedValueOnce({
        status: 'denied',
      });

      await registerForPushNotificationsAsync();

      expect(global.alert).toHaveBeenCalledWith(
        'Failed to get push token for push notification!',
      );
    });
  });

  describe('setupNotificationHandler', () => {
    it('should set up the notification handler', () => {
      setupNotificationHandler();

      expect(Notifications.setNotificationHandler).toHaveBeenCalledWith({
        handleNotification: expect.any(Function),
      });
    });
  });

  describe('scheduleNotification', () => {
    it('should schedule a notification with the correct parameters', async () => {
      await scheduleNotification(
        'Test Title',
        'Test Body',
        'ACTION_TYPE',
        { key: 'value' },
        5,
      );

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
        content: {
          title: 'Test Title',
          body: 'Test Body',
          data: {
            actionType: 'ACTION_TYPE',
            actionData: { key: 'value' },
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    });

    it('should use the default delay if no delay is provided', async () => {
      await scheduleNotification('Test Title', 'Test Body', 'ACTION_TYPE');

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
        content: {
          title: 'Test Title',
          body: 'Test Body',
          data: {
            actionType: 'ACTION_TYPE',
            actionData: undefined,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2, // Default delay
        },
      });
    });
  });
});
