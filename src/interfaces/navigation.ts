import { SCREENS } from '@/constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  [SCREENS.BOARDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.HOME]: undefined;
  [SCREENS.BOTTOM_TAB]: undefined;
};

// AppStack
export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;
