import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Favorite, Home, Notification, User } from '@/components/icons';

import { HomeScreen, ComingSoonScreen, ProfileScreen } from '@/screens';
import { SCREENS } from '@/constants';
import { BottomTabParamList } from '@/interfaces';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTab = () => (
  <Tab.Navigator
    initialRouteName={SCREENS.HOME}
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        gap: 65,
        paddingTop: 30,
        paddingBottom: 40,
      },
    }}>
    <Tab.Screen
      name={SCREENS.HOME}
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => <Home isActive={focused} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.FAVORITE}
      component={ComingSoonScreen}
      options={{
        tabBarIcon: ({ focused }) => <Favorite isActive={focused} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.NOTIFICATION}
      component={ComingSoonScreen}
      options={{
        tabBarIcon: ({ focused }) => <Notification isActive={focused} />,
      }}
    />
    <Tab.Screen
      name={SCREENS.PROFILE}
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => <User isActive={focused} />,
      }}
    />
  </Tab.Navigator>
);

export default BottomTab;
