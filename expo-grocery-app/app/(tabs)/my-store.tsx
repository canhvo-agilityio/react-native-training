import { Button, CartIcon, HeartIcon, Text } from '@/components';
import { useFetchProductsByStoreId, useFetchStoreByUserId } from '@/hooks';
import { colors, fontsFamily, fontSizes, fontWeights, spacing } from '@/themes';
import { router } from 'expo-router';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

export default function MyStore() {
  const { data, isFetching, error } = useFetchStoreByUserId('qwe6868');
  const { id, name } = data[0] || {};
  const {
    data: productsData,
    isFetching: isLoadingProducts,
    error: fetchProductsError,
  } = useFetchProductsByStoreId(id);

  const handlePressAddProduct = () => {
    router.push('/my-store/add-product');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading" size="xl">
          My Store
        </Text>
        <View style={styles.iconGroup}>
          <HeartIcon />
          <CartIcon />
        </View>
      </View>
      {error && <Text>Error when load store</Text>}
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.store}>
            <View style={styles.storeLogo}>
              <Text variant="heading" size="lg">
                {name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text variant="heading" size="xl" style={styles.storeName}>
              {name}
            </Text>
            <View style={styles.buttonGroup}>
              <Button variant="reversal" title="Edit Store" size="sm" />
              <Button title="View Store" size="sm" />
            </View>
          </View>
          <TouchableOpacity style={styles.removeButton}>
            <Text size="sm" style={styles.removeButtonText}>
              Remove Store
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {productsData.length > 0 ? (
        <Text>product</Text>
      ) : (
        <View style={styles.noProduct}>
          <Text variant="title" size="md" style={styles.noProductText}>
            You dont have product
          </Text>
          <Button
            title="Add Product"
            variant="reversal"
            size="lg"
            onPress={handlePressAddProduct}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  header: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    paddingTop: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  store: {
    alignItems: 'center',
    gap: spacing[4],
    paddingVertical: spacing[7],
    backgroundColor: colors.white1,
  },
  storeName: {
    color: colors.text.default,
  },
  storeLogo: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  removeButton: {
    backgroundColor: colors.white1,
    paddingVertical: spacing[2],
    borderTopWidth: 1,
    width: '100%',
    alignItems: 'center',
    borderTopColor: colors.border.borderPrimary,
  },
  removeButtonText: {
    opacity: 0.5,
  },
  noProduct: {
    alignItems: 'center',
    paddingTop: spacing[15],
    gap: spacing[9],
  },
  noProductText: {
    color: colors.black1,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
  },
});
