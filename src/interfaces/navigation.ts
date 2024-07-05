import { SCREENS } from '@/constants';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  [SCREENS.BOARDING]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParamList> | undefined;
  [SCREENS.PRODUCT_DETAILS]: {
    id: string;
  };
  [SCREENS.CART]: undefined;
};

export type BottomTabParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.FAVORITE]: undefined;
  [SCREENS.NOTIFICATION]: undefined;
  [SCREENS.PROFILE]: undefined;
};

// AppStack
export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Screen>,
    NativeStackScreenProps<AppStackParamList>
  >;
