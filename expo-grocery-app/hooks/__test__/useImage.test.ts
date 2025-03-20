import { renderHook, act } from '@testing-library/react-native';
import { useImageHandler } from '../useImage';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock('expo-camera', () => ({
  useCameraPermissions: jest.fn(() => [{ granted: false }, jest.fn()]),
}));

global.fetch = jest.fn();

describe('useImageHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the provided images', () => {
    const { result } = renderHook(() =>
      useImageHandler(['image1.jpg', 'image2.jpg']),
    );

    expect(result.current.images).toEqual(['image1.jpg', 'image2.jpg']);
  });

  it('should open the camera when permissions are granted', async () => {
    (Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: true },
      jest.fn(),
    ]);

    const { result } = renderHook(() => useImageHandler([]));

    await act(async () => {
      await result.current.openCamera();
    });

    expect(result.current.showCamera).toBe(true);
  });

  it('should request camera permissions if not granted', async () => {
    const mockRequestPermission = jest
      .fn()
      .mockResolvedValue({ granted: true });
    (Camera.useCameraPermissions as jest.Mock).mockReturnValue([
      { granted: false },
      mockRequestPermission,
    ]);

    const { result } = renderHook(() => useImageHandler([]));

    await act(async () => {
      await result.current.openCamera();
    });

    expect(mockRequestPermission).toHaveBeenCalled();
    expect(result.current.showCamera).toBe(true);
  });

  it('should take a picture and add it to the images list', async () => {
    const mockTakePictureAsync = jest
      .fn()
      .mockResolvedValue({ uri: 'new-image.jpg' });
    const cameraRef = { current: { takePictureAsync: mockTakePictureAsync } };

    const { result } = renderHook(() => useImageHandler([]));
    (result.current.cameraRef as any).current = cameraRef.current;

    await act(async () => {
      await result.current.takePicture();
    });

    expect(result.current.images).toEqual(['new-image.jpg']);
    expect(result.current.showCamera).toBe(false);
  });

  it('should pick an image from the library and add it to the images list', async () => {
    (ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: 'picked-image.jpg' }],
    });

    const { result } = renderHook(() => useImageHandler([]));

    await act(async () => {
      await result.current.pickImage();
    });

    expect(result.current.images).toEqual(['picked-image.jpg']);
  });

  it('should remove an image from the images list', () => {
    const { result } = renderHook(() =>
      useImageHandler(['image1.jpg', 'image2.jpg']),
    );

    act(() => {
      result.current.removeImage('image1.jpg');
    });

    expect(result.current.images).toEqual(['image2.jpg']);
  });

  it('should toggle the camera facing mode', () => {
    const { result } = renderHook(() => useImageHandler([]));

    act(() => {
      result.current.toggleCameraFacing();
    });

    expect(result.current.facing).toBe('front');

    act(() => {
      result.current.toggleCameraFacing();
    });

    expect(result.current.facing).toBe('back');
  });

  it('should toggle the camera visibility', () => {
    const { result } = renderHook(() => useImageHandler([]));

    act(() => {
      result.current.toggleCamera();
    });

    expect(result.current.showCamera).toBe(true);

    act(() => {
      result.current.toggleCamera();
    });

    expect(result.current.showCamera).toBe(false);
  });
});
