import { useState, useRef } from 'react';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { IMAGE_SERVICE_KEY } from '@/constants';
import * as Linking from 'expo-linking';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { Album, getAlbumsAsync, usePermissions } from 'expo-media-library';

export const useImageHandler = (data: string[]) => {
  const [images, setImages] = useState<string[]>(data);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [facing, setFacing] = useState<CameraType>('back');
  const [showCamera, setShowCamera] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = usePermissions();

  const openCamera = async () => {
    if (!cameraPermission?.granted) {
      const { granted } = await requestCameraPermission();

      if (!granted) {
        showActionSheetWithOptions(
          {
            title:
              'You have not granted camera access, please go to Settings to re-grant permissions.',
            options: ['Open Settings', 'Cancel'],
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
          },
          (selectedIndex) => {
            switch (selectedIndex) {
              case 0:
                Linking.openSettings();
                break;
              case 1:
                break;
            }
          },
        );
        return;
      }
    }

    setShowCamera(true);
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

  const openAlbums = async () => {
    if (!mediaPermission?.granted) {
      const { granted } = await requestMediaPermission();

      if (!granted) {
        showActionSheetWithOptions(
          {
            title:
              'You have not granted  access, please go to Settings to re-grant permissions.',
            options: ['Open Settings', 'Cancel'],
            cancelButtonIndex: 1,
            destructiveButtonIndex: 0,
          },
          (selectedIndex) => {
            switch (selectedIndex) {
              case 0:
                Linking.openSettings();
                break;
              case 1:
                break;
            }
          },
        );
        return;
      }
    }
    const fetchedAlbums = await getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
    setShowAlbums(true);
  };

  const handleHideAlbums = () => {
    setShowAlbums(false);
  };

  const pickImage = async (uris: string[]) => {
    setImages((prev) => {
      const uniqueUris = uris.filter((uri) => !prev.includes(uri));
      return [...prev, ...uniqueUris];
    });
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
    openAlbums,
    albums,
    showAlbums,
    handleHideAlbums,
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
