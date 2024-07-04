import { useCallback } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

// Components
import { Button, Text } from '@/components';

// Constants
import { SCREENS } from '@/constants';

// Interfaces
import { AppStackScreenProps } from '@/interfaces';

type BoardingScreenProps = AppStackScreenProps<typeof SCREENS.BOARDING>;

export const BoardingScreen = ({ navigation }: BoardingScreenProps) => {
  const handleGetStarted = useCallback(() => {
    navigation.navigate(SCREENS.LOGIN);
  }, [navigation]);

  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.wrapper}
      source={require('@/assets/images/bg-boarding.png')}>
      <Text value="MAKE YOUR" variant="subTitle" size="xl" />
      <Text value="HOME BEAUTIFUL" variant="title" size="2xl" />
      <Text
        value="The best simple place where you discover most wonderful furnitures and make your home beautiful"
        variant="description"
        size="md"
        style={styles.description}
      />

      <View style={styles.action}>
        <Button text="Get Started" onPress={handleGetStarted} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    resizeMode: 'cover',
    paddingTop: 231,
    paddingBottom: 150,
  },
  description: {
    paddingTop: 35,
    paddingLeft: 19,
    lineHeight: 35,
    textAlign: 'justify',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 154,
  },
});
