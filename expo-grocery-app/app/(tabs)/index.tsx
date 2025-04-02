import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import {
  BannerList,
  Button,
  CartIcon,
  CategoryList,
  HeartIcon,
  Input,
  ProductList,
  SearchIcon,
  Text,
} from '@/components';
import { lazy, Suspense, useCallback, useState } from 'react';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import { router } from 'expo-router';
import { BANNERS, CATEGORIES, STORES } from '@/mocks';
import { useFetchProducts } from '@/hooks';
import { ENDPOINTS, ROUTES } from '@/constants';
import { PerformanceMeasureView } from '@shopify/react-native-performance';

const StoreList = lazy(() => import('@/components/StoreList'));

export default function HomeScreen() {
  const [searchValue, setSearchValue] = useState<string>('');

  const {
    data: newProductData,
    isFetching: isLoadingNewProduct,
    error: newProductError,
  } = useFetchProducts(ENDPOINTS.NEW_PRODUCTS);

  const {
    data: popularProductData,
    isFetching: isLoadingPopularProduct,
    error: popularProductError,
  } = useFetchProducts(ENDPOINTS.POPULAR_PRODUCTS);

  const handleChangeSearchInput = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handlePressCategoryItem = useCallback((id: number) => {
    router.push(ROUTES.CATEGORY(id));
  }, []);

  const handlePressProduct = useCallback((id: string) => {
    router.push(ROUTES.PRODUCT_DETAILS(id));
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text variant="heading" size="xl">
            Groceries
          </Text>
          <View style={styles.iconGroup}>
            <HeartIcon />
            <CartIcon />
          </View>
        </View>
        <Input
          value={searchValue}
          placeholder="Search Product"
          leftIcon={<SearchIcon color={colors.primary} />}
          onChangeText={handleChangeSearchInput}
        />
      </View>
      <ScrollView style={styles.wrapper}>
        {/* Banner */}
        <View style={styles.banner}>
          <BannerList data={BANNERS} />
        </View>
        {/* Categories */}
        <CategoryList data={CATEGORIES} onPress={handlePressCategoryItem} />
        {/* New Products */}
        <View style={styles.product}>
          <View style={styles.productHeading}>
            <Text variant="title" style={styles.productTitle}>
              New Product
            </Text>
            <Button title="See All" size="sm" />
          </View>
          {newProductError && <Text>Error when load new products</Text>}
          {isLoadingNewProduct ? (
            <ActivityIndicator />
          ) : (
            <ProductList
              data={newProductData || []}
              onPress={handlePressProduct}
            />
          )}
        </View>
        {/* Popular products */}
        <View style={styles.product}>
          <View style={styles.productHeading}>
            <Text variant="title" style={styles.productTitle}>
              Popular Product
            </Text>
            <Button title="See All" size="sm" />
          </View>
          {popularProductError && <Text>Error when load popular products</Text>}
          {isLoadingPopularProduct ? (
            <ActivityIndicator />
          ) : (
            <ProductList
              data={popularProductData || []}
              onPress={handlePressProduct}
            />
          )}
        </View>
        {/* Stores */}
        <View style={styles.storesHeading}>
          <Text variant="title" style={styles.storesTitle}>
            Store to follow
          </Text>
          <Button title="See All" size="sm" variant="secondary" />
        </View>
        <View style={styles.storeList}>
          <Suspense fallback={<ActivityIndicator />}>
            <StoreList data={STORES} />
          </Suspense>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.tertiary,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.background.primary,
    padding: spacing[4],
    gap: spacing[4],
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  banner: {
    padding: spacing[2],
  },
  product: {
    padding: spacing[2],
    gap: spacing[2],
  },
  productHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
  },
  storesHeading: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: spacing[2],
    backgroundColor: colors.background.primary,
    paddingTop: spacing[4],
  },
  storesTitle: {
    color: colors.text.light,
    fontFamily: fontsFamily.bold,
    fontWeight: fontWeights.bold,
    height: 184,
  },
  storeList: {
    bottom: 130,
    paddingHorizontal: spacing[5],
  },
});
