import { router, Tabs } from 'expo-router';
import {
  HomeIcon,
  SearchIcon,
  StoreIcon,
  OrderIcon,
  UserIcon,
} from '@/components';
import { colors } from '@/themes';
import { useEffect } from 'react';
import {
  registerForPushNotificationsAsync,
  setupNotificationHandler,
} from '@/utils';
import * as Notifications from 'expo-notifications';
import { NOTIFICATION_ACTION_KEYS } from '@/constants';

export default function TabLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    setupNotificationHandler();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { actionType, actionData } =
          response.notification.request.content.data;
        if (actionType === NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING) {
          const url = actionData.url;
          router.push(url);
        }
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarStyle: { height: 86, paddingTop: 13, paddingBottom: 33 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-store"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <StoreIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="order-history"
        options={{
          title: 'Order History',
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
