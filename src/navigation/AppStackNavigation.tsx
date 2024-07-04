import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { BoardingScreen, LoginScreen } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AppStackParamList } from '@/interfaces';
import BottomTab from './BottomTab';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={SCREENS.BOARDING}
        options={{
          headerShown: false,
        }}
        component={BoardingScreen}
      />
      <AppStack.Screen
        name={SCREENS.LOGIN}
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <AppStack.Screen
        name={SCREENS.BOTTOM_TAB}
        options={{
          headerShown: false,
        }}
        component={BottomTab}
      />
    </AppStack.Navigator>
  );
};
