import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { BoardingScreen, LoginScreen, ProductDetailsScreen } from '@/screens';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AppStackParamList } from '@/interfaces';
import BottomTab from './BottomTab';
import { CartScreen } from '@/screens/Cart';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Group screenOptions={{ headerShown: false }}>
        <AppStack.Screen name={SCREENS.BOARDING} component={BoardingScreen} />
        <AppStack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
        <AppStack.Screen name={SCREENS.BOTTOM_TAB} component={BottomTab} />
        <AppStack.Screen
          name={SCREENS.PRODUCT_DETAILS}
          component={ProductDetailsScreen}
        />
        <AppStack.Screen name={SCREENS.CART} component={CartScreen} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};
