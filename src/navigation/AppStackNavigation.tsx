import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { LoginScreen, RegisterScreen } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AppStackParamList } from '@/interfaces';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <AppStack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
    </AppStack.Navigator>
  );
};
