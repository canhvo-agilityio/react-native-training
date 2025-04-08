import { ChevronLeftIcon, ProductForm, Text } from '@/components';
import { ProductFormType } from '@/components/ProductForm';
import { CATEGORIES, NOTIFICATION_ACTION_KEYS, ROUTES } from '@/constants';
import { useAddProduct, useUploadToImgBB } from '@/hooks';
import { ProductRequest } from '@/interfaces';
import { colors, spacing } from '@/themes';
import {
  checkAndRequestNotificationPermission,
  scheduleNotification,
} from '@/utils';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '@/stores';

export default function AddProduct() {
  const { user } = useAuthStore();
  const { storeId, storeName } = user || {};
  const { mutate: addProduct, error, isPending } = useAddProduct();

  const handlePressBackIcon = () => {
    router.back();
  };

  const handleSubmit = async (data: ProductFormType) => {
    const dataConvert: ProductRequest = {
      name: data.name,
      oldPrice: Number(data.price),
      newPrice: Number(data.offerPrice),
      images: data.images,
      description: data.description,
      storeName: storeName,
      storeId: storeId,
      categoryId:
        Number(
          Object.keys(CATEGORIES).find(
            (key) => CATEGORIES[Number(key)] === data.category,
          ),
        ) ?? -1,
      location: data.location,
      additionalDetails: data.additionalDetails,
      priceType: data.priceType,
    };

    addProduct(dataConvert, {
      onSuccess: async (product) => {
        await checkAndRequestNotificationPermission();
        router.push(ROUTES.MY_STORE);
        scheduleNotification(
          'Add product successfully',
          `Click to see product details: ${product.name}`,
          NOTIFICATION_ACTION_KEYS.HANDLE_DEEPLINKING,
          { url: `products/${product.id}` },
        );
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Add product failed',
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <TouchableOpacity onPress={handlePressBackIcon}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <Text variant="heading" size="xl" style={styles.title}>
            Add Product
          </Text>
        </View>
      </View>
      {error && <Text>{error.message}</Text>}
      {/* Form field */}
      <ProductForm onSubmit={handleSubmit} isLoading={isPending} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  header: {
    backgroundColor: colors.primary,
    gap: spacing[8],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
  },
  titleGroup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
});
