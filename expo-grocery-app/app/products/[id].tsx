import {
  Button,
  ChevronLeftIcon,
  HeartOutlineIcon,
  MoreIcon,
  ShareIcon,
  Text,
} from '@/components';
import { useFetchProductDetail } from '@/hooks';
import { colors, spacing } from '@/themes';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { data, error, refetch, isRefetching } =
    useFetchProductDetail(productId);
  const { name, images, description, newPrice, oldPrice, storeName } =
    data || {};
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Image
        source={{ uri: item }}
        style={styles.image}
        contentFit="contain"
        cachePolicy="memory-disk"
      />
    );
  };

  const handlePressBack = () => {
    router.back();
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
      >
        {error && <Text>Error when load product</Text>}
        <View style={styles.imageContainer}>
          <View style={styles.overlay} />

          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(item) => item}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            renderItem={renderItem}
          />

          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handlePressBack}
            >
              <ChevronLeftIcon />
            </TouchableOpacity>
            <View style={styles.iconGroup}>
              <TouchableOpacity style={styles.iconButton}>
                <ShareIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <HeartOutlineIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MoreIcon />
              </TouchableOpacity>
            </View>
          </View>

          {/* Indicator */}
          <View style={styles.indicatorContainer}>
            {images?.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
        <View style={styles.nameGroup}>
          <Text variant="heading" style={styles.name}>
            {name}
          </Text>
          <View style={styles.priceGroup}>
            <Text variant="heading" style={styles.newPrice}>
              ${newPrice}
            </Text>
            {oldPrice ? (
              <Text>{`$${oldPrice} ${newPrice ? (newPrice * 100) / oldPrice : 0}% off`}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.store}>
          <View style={styles.storeGroup}>
            <View style={styles.storeLogo}>
              <Text variant="heading">
                {storeName?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text>{storeName}</Text>
          </View>
          <Button title="Follow" size="sm" />
        </View>
        <View style={styles.description}>
          <Text size="xs">{description}</Text>
        </View>
        <View style={styles.addToCartBtn}>
          <Button title="Add Product" />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 250,
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  topBar: {
    position: 'absolute',
    top: spacing[3],
    left: spacing[3],
    right: spacing[3],
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  iconButton: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: spacing[4],
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white1,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: colors.primary,
    opacity: 1,
  },
  name: {
    color: colors.text.default,
  },
  nameGroup: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[7],
    backgroundColor: colors.white1,
    marginBottom: spacing[2],
    gap: spacing[3],
  },
  newPrice: {
    color: colors.text.primary,
  },
  priceGroup: {
    flexDirection: 'row',
    gap: spacing[3.5],
  },
  store: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[5],
    backgroundColor: colors.white1,
    marginBottom: spacing[2],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeLogo: {
    width: spacing[8],
    height: spacing[8],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing[4],
    backgroundColor: colors.primary,
  },
  storeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  description: {
    flex: 1,
    paddingTop: spacing[15],
    paddingHorizontal: spacing[3],
    backgroundColor: colors.white1,
  },
  addToCartBtn: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[3],
    backgroundColor: colors.white1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
