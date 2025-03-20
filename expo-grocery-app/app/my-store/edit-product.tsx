import { ChevronLeftIcon, ProductForm, Text } from '@/components';
import { ProductFormType } from '@/components/ProductForm';
import { CATEGORIES, ROUTES } from '@/constants';
import {
  useFetchProductDetail,
  useUpdateProduct,
  useUploadToImgBB,
} from '@/hooks';
import { ProductDetails, ProductRequest } from '@/interfaces';
import { colors, spacing } from '@/themes';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const {
    data: productData,
    isFetching: isFetchingProduct,
    error: fetchProductError,
  } = useFetchProductDetail(productId);
  const {
    name,
    oldPrice,
    newPrice,
    images,
    description,
    categoryId,
    location,
    additionalDetails,
    priceType,
  } = productData || {};

  const productFormData: ProductFormType = {
    name,
    category: CATEGORIES[categoryId],
    price: String(oldPrice),
    offerPrice: String(newPrice),
    location: location || '',
    description: description,
    priceType: priceType || '',
    additionalDetails: additionalDetails || '',
    images: images,
  };

  const { mutate: uploadImages, isPending: isUploading } = useUploadToImgBB();
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const handlePressBackIcon = () => {
    router.back();
  };

  const getUpdatedProductFields = (
    data: ProductFormType,
    productFormData: ProductFormType,
  ): Partial<ProductDetails> => {
    const updatedFields: Partial<ProductDetails> = {};

    if (data.name !== productFormData.name) updatedFields.name = data.name;
    if (Number(data.price) !== Number(productFormData.price))
      updatedFields.oldPrice = Number(data.price);
    if (Number(data.offerPrice) !== Number(productFormData.offerPrice))
      updatedFields.newPrice = Number(data.offerPrice);
    if (data.description !== productFormData.description)
      updatedFields.description = data.description;
    if (data.category !== productFormData.category)
      updatedFields.categoryId =
        Number(
          Object.keys(CATEGORIES).find(
            (key) => CATEGORIES[Number(key)] === data.category,
          ),
        ) ?? -1;
    if (data.location !== productFormData.location)
      updatedFields.location = data.location;
    if (data.additionalDetails !== productFormData.additionalDetails)
      updatedFields.additionalDetails = data.additionalDetails;
    if (data.priceType !== productFormData.priceType)
      updatedFields.priceType = data.priceType;

    return updatedFields;
  };

  const sendUpdateRequest = (
    productId: string,
    updatedFields: Partial<ProductDetails>,
  ) => {
    updateProduct(
      { id: productId, data: updatedFields },
      {
        onSuccess: () => {
          router.push(ROUTES.MY_STORE);
          Toast.show({ type: 'success', text1: 'Update successfully' });
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Update failed',
            text2: error.message,
          });
        },
      },
    );
  };

  const handleSubmit = async (data: ProductFormType) => {
    const updatedFields = getUpdatedProductFields(data, productFormData);

    const newImages = data.images || [];
    const oldImages = productFormData.images || [];

    const removedImages = oldImages.filter((img) => !newImages.includes(img));
    const addedImages = newImages.filter((img) => !oldImages.includes(img));

    if (addedImages.length > 0) {
      uploadImages(addedImages, {
        onSuccess: (uploadedUrls) => {
          updatedFields.images = [
            ...uploadedUrls,
            ...newImages.filter((img) => oldImages.includes(img)),
          ];
          sendUpdateRequest(productId, updatedFields);
        },
        onError: () => {
          Toast.show({
            type: 'error',
            text1: 'Update failed',
            text2: 'Error when uploading images',
          });
        },
      });
    } else if (removedImages.length > 0) {
      updatedFields.images = newImages;
      sendUpdateRequest(productId, updatedFields);
    } else {
      sendUpdateRequest(productId, updatedFields);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <TouchableOpacity onPress={handlePressBackIcon}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <Text variant="heading" size="xl" style={styles.title}>
            Edit product
          </Text>
        </View>
      </View>
      {fetchProductError && <Text>{fetchProductError.message}</Text>}
      {/* Form field */}
      {isFetchingProduct ? (
        <ActivityIndicator />
      ) : (
        <ProductForm
          onSubmit={handleSubmit}
          data={productFormData}
          isEdit
          isLoading={isPending || isUploading}
        />
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
