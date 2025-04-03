import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text } from '@/components';
import { colors, radius, spacing } from '@/themes';
import { ROUTES } from '@/constants';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../../assets/images/boarding1.png'),
    title: 'Empowering Artisans, Farmers & Micro Business',
  },
  {
    id: '2',
    image: require('../../assets/images/boarding2.png'),
    title: 'Connecting NGOs, Social Enterprises with Communities',
  },
  {
    id: '3',
    image: require('../../assets/images/boarding3.png'),
    title: 'Donate, Invest & Support infrastructure projects',
  },
];

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace(ROUTES.LOGIN);
    }
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; image: any; title: string };
  }) => (
    <View style={styles.slideContainer}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text
        variant="title"
        size="lg"
        color={colors.primary}
        style={styles.title}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        style={styles.flatList}
        renderItem={renderItem}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { opacity: index === currentIndex ? 1 : 0.6 },
              ]}
            />
          ))}
        </View>

        <Button
          variant="primary"
          size="full"
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  flatList: {
    zIndex: 1,
  },
  slideContainer: {
    gap: 30,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[10],
  },
  imageWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white1,
    borderRadius: radius[2],
  },
  image: {
    width: 250,
    height: 300,
  },
  title: {
    textAlign: 'center',
    padding: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width,
    paddingHorizontal: spacing[5],
    height: '50%',
    justifyContent: 'flex-end',
    backgroundColor: colors.white1,
    paddingBottom: spacing[5],
    gap: spacing[10],
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  button: {
    zIndex: 2,
  },
});
