import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppStackNavigation } from './AppStackNavigation';
import { StatusBar } from 'react-native';
import { colors } from '@/themes';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.common.white,
  },
};

export const Navigation = () => {
  return (
    <NavigationContainer theme={theme}>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <AppStackNavigation />
    </NavigationContainer>
  );
};
