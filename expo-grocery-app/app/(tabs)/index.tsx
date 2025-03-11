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
  StoreList,
  Text,
} from '@/components';
import { useState } from 'react';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import { router } from 'expo-router';
import { BANNERS, CATEGORIES, STORES } from '@/mocks';
import { useFetchProducts } from '@/hooks';
import { ENDPOINTS } from '@/constants';

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

  const handleChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  const handlePressCategoryItem = (id: number) => {
    router.push(`/categories/${id}`);
  };

  const handlePressProduct = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <ScrollView style={styles.wrapper}>
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
            <ProductList data={newProductData} onPress={handlePressProduct} />
          )}
        </View>
        {/* Popular products */}
        <View style={styles.product}>
          <View style={styles.productHeading}>
            <Text variant="title" style={styles.productTitle}>
              New Product
            </Text>
            <Button title="See All" size="sm" />
          </View>
          {popularProductError && <Text>Error when load popular products</Text>}
          {isLoadingPopularProduct ? (
            <ActivityIndicator />
          ) : (
            <ProductList
              data={popularProductData}
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
          <StoreList data={STORES} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.tertiary,
  },
  container: {
    gap: spacing[3],
    paddingBottom: 180,
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
    position: 'absolute',
    bottom: spacing[20],
    paddingHorizontal: spacing[5],
  },
});
