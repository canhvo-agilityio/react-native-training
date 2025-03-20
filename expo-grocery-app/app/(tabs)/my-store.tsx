import { Button, CartIcon, HeartIcon, ProductList, Text } from '@/components';
import { ROUTES } from '@/constants';
import { useDeleteProduct, useFetchProductsByStoreId } from '@/hooks';
import { useAuthStore } from '@/stores';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import { router } from 'expo-router';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';

export default function MyStore() {
  const { user } = useAuthStore();
  const { storeId, storeName } = user || {};
  const {
    data: productsData,
    isFetching: isLoadingProducts,
    error: fetchProductsError,
  } = useFetchProductsByStoreId(storeId);
  const { mutate: deleteProduct, isPending: deletingProduct } =
    useDeleteProduct();

  const handlePressAddProduct = () => {
    router.push(ROUTES.ADD_PRODUCT);
  };

  const handlePressEditIcon = (id: string) => {
    router.push({
      pathname: ROUTES.EDIT_PRODUCT,
      params: { id: id },
    });
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        router.push(ROUTES.MY_STORE);
        Toast.show({ type: 'success', text1: 'Product is deleted' });
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Delete fail failed',
          text2: error.message,
        });
      },
    });
  };

  const handlePressDeleteIcon = (id: string) => {
    Alert.alert(
      'Delete confirm',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Delete',
          onPress: () => handleDeleteProduct(id),
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {deletingProduct && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <View style={styles.header}>
        <Text variant="heading" size="xl">
          My Store
        </Text>
        <View style={styles.iconGroup}>
          <HeartIcon />
          <CartIcon />
        </View>
      </View>
      <View>
        <View style={styles.store}>
          <View style={styles.storeLogo}>
            <Text variant="heading" size="lg">
              {storeName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text variant="heading" size="xl" style={styles.storeName}>
            {storeName}
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
      {fetchProductsError && <Text>Error when load product</Text>}

      {isLoadingProducts ? (
        <ActivityIndicator />
      ) : productsData.length > 0 ? (
        <View style={styles.productContainer}>
          <View style={styles.productHeading}>
            <Text variant="title" size="xl">
              Products
            </Text>
            <Button
              title="Add Product"
              size="sm"
              onPress={handlePressAddProduct}
            />
          </View>
          <ProductList
            data={productsData}
            isEditing
            isGrid
            onEdit={handlePressEditIcon}
            onDelete={handlePressDeleteIcon}
          />
        </View>
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
    paddingBottom: 300,
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
  productHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productContainer: {
    marginTop: spacing[3],
    justifyContent: 'center',
    gap: spacing[4],
    paddingHorizontal: spacing[4],
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
});
