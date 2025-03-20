import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { IMAGE_SERVICE_KEY } from '@/constants';

export const useImageHandler = (data: string[]) => {
  const [images, setImages] = useState<string[]>(data);
  const [facing, setFacing] = useState<CameraType>('back');
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const { granted } = await requestCameraPermission();
      if (granted) setShowCamera(true);
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
    setImages((prev) => prev.filter((image) => image !== uri));
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleCamera = () => {
    setShowCamera((prev) => !prev);
  };

  return {
    images,
    cameraRef,
    facing,
    showCamera,
    openCamera,
    takePicture,
    pickImage,
    removeImage,
    toggleCameraFacing,
    toggleCamera,
  };
};

const uploadImage = async (imageUri: string) => {
  const formData = new FormData();

  const imageBlob = {
    uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
    name: 'image.jpg',
    type: 'image/jpeg',
  } as any;

  formData.append('image', imageBlob);
  formData.append('key', IMAGE_SERVICE_KEY || '');

  const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error?.message || 'Upload failed');
  }

  return result.data.url;
};

export const useUploadToImgBB = () => {
  return useMutation({
    mutationFn: async (imageUris: string[]) => {
      return Promise.all(imageUris.map(uploadImage));
    },
  });
};
