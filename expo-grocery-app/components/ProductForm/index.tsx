import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Controller, useForm } from 'react-hook-form';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import {
  Button,
  CloseIcon,
  PlushIcon,
  ReverseCameraIcon,
  Text,
  Input,
  Select,
} from '@/components';
import { CATEGORIES, ERROR_MESSAGES } from '@/constants';

export interface ProductFormType {
  name: string;
  category: string;
  price: string;
  offerPrice: string;
  location: string;
  description: string;
  priceType: string;
  additionalDetails: string;
}

interface ProductFormProps {
  onSubmit: () => void;
}

const formFields: {
  key: keyof ProductFormType;
  label: string;
  type: string;
  name: keyof ProductFormType;
  option?: string[];
  rules: { required: string };
}[] = [
  {
    key: 'name',
    label: 'Product Name',
    name: 'name',
    type: 'input',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'price',
    label: 'Price',
    name: 'price',
    type: 'input',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'offerPrice',
    label: 'Offer Price',
    name: 'offerPrice',
    type: 'input',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'category',
    label: 'Category Product',
    name: 'category',
    type: 'select',
    option: Object.values(CATEGORIES),
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'location',
    label: 'Location Details',
    name: 'location',
    type: 'input',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'description',
    label: 'Product Description',
    name: 'description',
    type: 'input',
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'priceType',
    label: 'Price Type',
    name: 'priceType',
    type: 'select',
    option: ['Fixed', 'Absolute'],
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
  {
    key: 'additionalDetails',
    label: 'Additional Details',
    name: 'additionalDetails',
    type: 'select',
    option: ['Cash on delivery', 'Available'],
    rules: { required: ERROR_MESSAGES.FIELD_REQUIRED },
  },
];

const ProductForm = ({ onSubmit }: ProductFormProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [showCamera, setShowCamera] = useState(false);
  const { control, clearErrors, handleSubmit } = useForm<ProductFormType>({
    defaultValues: {
      name: '',
      category: '',
      price: '',
      offerPrice: '',
      location: '',
      description: '',
      priceType: '',
      additionalDetails: '',
    },
  });

  if (!cameraPermission) {
    return null;
  }

  const toggleCamera = () => {
    setShowCamera((prev) => !prev);
  };

  const openCamera = async () => {
    if (!cameraPermission.granted) {
      const { granted } = await requestCameraPermission();

      if (granted) {
        setShowCamera(true);
      }
    } else {
      setShowCamera(true);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setImages((prev) => [...prev, photo.uri]);
        setShowCamera(false);
      }
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prevImages) => prevImages.filter((image) => image !== uri));
  };

  const handlePressAddProduct = () => {
    Alert.alert(
      'Choose photo',
      'Do you want to take a photo or choose from the library?',
      [
        {
          text: 'Take a photo',
          onPress: openCamera,
        },
        {
          text: 'Choose photo from library',
          onPress: pickImage,
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity
        style={styles.removeIcon}
        onPress={() => removeImage(item)}
      >
        <CloseIcon width={12} height={12} />
      </TouchableOpacity>
    </View>
  );

  const handleSubmitProductForm = (data: ProductFormType) => {
    console.log(data);

    // onSubmit(data);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image Upload Section */}
      <View style={styles.imageSection}>
        {images.length < 4 && (
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={handlePressAddProduct}
          >
            <PlushIcon />
            <Text style={styles.addPhotoText}>Add photos</Text>
            <Text style={styles.photoHint}>1600 x 1200 for hi res</Text>
          </TouchableOpacity>
        )}
        {images.map((item) => (
          <View key={item} style={styles.imageWrapper}>
            <Image source={{ uri: item }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => removeImage(item)}
            >
              <CloseIcon width={12} height={12} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {showCamera && (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
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
        </CameraView>
      )}
      <View style={styles.formField}>
        {formFields.map((field) =>
          field.type === 'input' ? (
            <Controller
              key={field.key}
              control={control}
              name={field.name}
              rules={field.rules}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Input
                  label={field.label}
                  variant="flushed"
                  value={value}
                  errorMessage={error?.message}
                  // style={field.style}
                  onChangeText={(data) => {
                    clearErrors(field.name);
                    onChange(data);
                  }}
                />
              )}
            />
          ) : (
            <Controller
              key={field.key}
              control={control}
              name={field.name}
              rules={field.rules}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <Select
                  value={value}
                  data={field.option || []}
                  placeholder={field.label}
                  errorMessage={error?.message}
                  onSelect={(data) => {
                    clearErrors(field.name);
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
          title="Add Product"
          onPress={handleSubmit(handleSubmitProductForm)}
        />
      </View>
    </ScrollView>
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
  },
  image: {
    width: 140,
    height: 124,
    borderRadius: 8,
  },
  removeIcon: {
    position: 'absolute',
    top: -5,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
