import React, { lazy, Suspense, useCallback, useMemo } from 'react';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import { useActionSheet } from '@expo/react-native-action-sheet';

import {
  Button,
  CloseIcon,
  PlushIcon,
  ReverseCameraIcon,
  Text,
  Input,
  Select,
} from '@/components';
import { PRODUCT_FORM_FIELDS } from '@/constants';
import { useImageHandler, useUploadToImgBB } from '@/hooks';
import isEqual from 'react-fast-compare';
import { formatDecimalInput, unformatDecimalInput } from '@/utils';
import Toast from 'react-native-toast-message';

const LazyCameraView = lazy(() =>
  import('expo-camera').then((mod) => ({ default: mod.CameraView })),
);
const LazyAlbumEntry = lazy(() => import('@/components/AlbumEntry'));

export interface ProductFormType {
  name: string;
  category: string;
  price: string;
  offerPrice: string;
  location: string;
  description: string;
  priceType: string;
  additionalDetails: string;
  images: string[];
}

interface ProductFormProps {
  isLoading: boolean;
  isEdit?: boolean;
  data?: ProductFormType;
  onSubmit: (data: ProductFormType) => void;
}

const INIT_FORM_VALUES = {
  name: '',
  category: '',
  price: '',
  offerPrice: '',
  location: '',
  description: '',
  priceType: '',
  additionalDetails: '',
  images: [],
};

const ProductForm = ({
  isLoading = false,
  isEdit = false,
  data = INIT_FORM_VALUES,
  onSubmit,
}: ProductFormProps) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [error, setError] = useState<string | null>(null);
  const { control, clearErrors, handleSubmit, watch } =
    useForm<ProductFormType>({
      defaultValues: data,
    });

  const {
    images,
    cameraRef,
    facing,
    showCamera,
    openCamera,
    takePicture,
    pickImage,
    removeImage,
    toggleCamera,
    toggleCameraFacing,
    openAlbums,
    albums,
    showAlbums,
    handleHideAlbums,
  } = useImageHandler(data.images);

  const { mutate: uploadImages, isPending: isUploading } = useUploadToImgBB();

  const isUnchanged = isEqual(
    { ...watch(), images },
    { ...data, images: data.images },
  );

  const handlePressAddPhotos = useCallback(() => {
    handleHideAlbums();
    showActionSheetWithOptions(
      {
        options: ['Take a photo', 'Choose photo from library', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            openCamera();
            break;
          case 1:
            openAlbums();
            break;
          case 2:
            // Cancel
            break;
        }
      },
    );
  }, [handleHideAlbums, showActionSheetWithOptions, openCamera, openAlbums]);

  const handleSubmitProductForm = useCallback(
    (formData: ProductFormType) => {
      if (!images.length) {
        setError('Please add at least one image');
        return;
      }
      onSubmit({
        ...formData,
        images,
        price: unformatDecimalInput(formData.price),
        offerPrice: unformatDecimalInput(formData.offerPrice),
      });
    },
    [images, onSubmit],
  );

  const handleUploadImages = useCallback(
    (uris: string[]) => {
      uploadImages(uris, {
        onSuccess: (uploadedUrls) => {
          pickImage(uploadedUrls);
        },
        onError: () => {
          Toast.show({
            type: 'error',
            text1: 'Upload image failed',
            text2: 'Error when upload product images',
          });
        },
      });
    },
    [pickImage, uploadImages],
  );

  const renderImageItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item }} style={styles.image} />
        <TouchableOpacity
          testID={`remove-image-button-${item}`}
          style={styles.removeIcon}
          onPress={() => removeImage(item)}
        >
          <CloseIcon width={12} height={12} />
        </TouchableOpacity>
      </View>
    ),
    [removeImage],
  );

  const renderItem = useCallback(
    () => (
      <View style={styles.container}>
        {/* Image Upload Section */}
        <View style={styles.imageSection}>
          {images.length < 4 && (
            <TouchableOpacity
              testID="add-photo-button"
              style={styles.addPhoto}
              onPress={handlePressAddPhotos}
            >
              <PlushIcon />
              <Text style={styles.addPhotoText}>Add photos</Text>
              <Text style={styles.photoHint}>1600 x 1200 for hi res</Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={images}
            keyExtractor={(item) => item}
            horizontal
            renderItem={renderImageItem}
          />

          {error && (
            <Text variant="error" size="base" style={styles.errorMessage}>
              {error}
            </Text>
          )}
        </View>

        {/* Form Field Section */}
        <View style={styles.formField}>
          {PRODUCT_FORM_FIELDS.map((field) =>
            field.option ? (
              <Controller
                key={field.key}
                control={control}
                name={field.name as keyof ProductFormType}
                rules={field.rules}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Select
                    value={String(value)}
                    data={field.option}
                    placeholder={field.label}
                    errorMessage={error?.message}
                    onSelect={(data) => {
                      clearErrors(field.name as keyof ProductFormType);
                      onChange(data);
                    }}
                  />
                )}
              />
            ) : (
              <Controller
                key={field.key}
                control={control}
                name={field.name as keyof ProductFormType}
                rules={field.rules}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <Input
                    testID={field.label}
                    label={field.label}
                    variant="flushed"
                    value={
                      field.key === 'price' || field.name === 'offerPrice'
                        ? formatDecimalInput(String(value))
                        : String(value)
                    }
                    disabled={isLoading}
                    keyboardType={
                      field.key === 'price' || field.name === 'offerPrice'
                        ? 'numeric'
                        : 'default'
                    }
                    errorMessage={error?.message}
                    onChangeText={(data) => {
                      clearErrors(field.name as keyof ProductFormType);
                      onChange(data);
                    }}
                  />
                )}
              />
            ),
          )}
        </View>

        <View style={styles.addBtn}>
          <Button
            testID="submit-button"
            title={isEdit ? 'Edit Product' : 'Add Product'}
            isLoading={isLoading}
            disabled={isUnchanged}
            onPress={handleSubmit(handleSubmitProductForm)}
          />
        </View>
      </View>
    ),
    [
      images,
      handlePressAddPhotos,
      renderImageItem,
      error,
      isEdit,
      isLoading,
      isUnchanged,
      handleSubmit,
      handleSubmitProductForm,
      control,
      clearErrors,
    ],
  );

  const flatListData = useMemo(() => [{ key: 'form' }], []);
  const getKeyExtractor = useCallback((item: { key: string }) => item.key, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FlatList
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
          data={flatListData}
          renderItem={renderItem}
          keyExtractor={getKeyExtractor}
        />
      </KeyboardAvoidingView>
      {showCamera && (
        <Suspense fallback={null}>
          <LazyCameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.cameraIconGroup}>
              <TouchableOpacity onPress={toggleCamera}>
                <CloseIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <ReverseCameraIcon />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            />
          </LazyCameraView>
        </Suspense>
      )}

      {albums && albums.length > 0 && showAlbums && (
        <Suspense fallback={null}>
          <LazyAlbumEntry
            albums={albums}
            maxSelection={4 - images.length}
            isLoading={isUploading}
            onSelect={handleUploadImages}
            onClose={handleHideAlbums}
          />
        </Suspense>
      )}
    </>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing[20],
    backgroundColor: colors.white1,
  },
  imageSection: {
    paddingVertical: spacing[8],
    gap: spacing[3],
    paddingHorizontal: spacing[7],
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  addPhoto: {
    width: 140,
    height: 124,
    borderWidth: 1,
    borderColor: colors.gray4,
    borderRadius: spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    gap: spacing[2],
  },
  addPhotoText: {
    fontFamily: fontsFamily.semiBold,
    fontWeight: fontWeights.semiBold,
    color: colors.text.dark,
    opacity: 0.4,
  },
  photoHint: {
    color: colors.text.dark,
    opacity: 0.2,
    fontSize: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: spacing[2],
  },
  image: {
    width: 140,
    height: 124,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    right: -5,
    backgroundColor: colors.gray2,
    padding: spacing[1],
    borderRadius: 10,
  },
  camera: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[5],
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraIconGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  captureButton: {
    width: spacing[18],
    height: spacing[18],
    borderRadius: spacing[9],
    backgroundColor: colors.white1,
  },
  formField: {
    gap: spacing[7],
    padding: spacing[5],
    backgroundColor: colors.white1,
    flex: 1,
  },
  priceInput: {
    width: 150,
  },
  priceGroup: {
    flexDirection: 'row',
    gap: spacing[10],
  },
  addBtn: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[3],
    backgroundColor: colors.white1,
  },
  errorMessage: {
    position: 'absolute',
    bottom: 0,
    left: spacing[6],
  },
});
