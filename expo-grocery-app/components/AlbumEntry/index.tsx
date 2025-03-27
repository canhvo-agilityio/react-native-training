import { Album, getAssetsAsync, Asset } from 'expo-media-library';
import { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { Button, Select } from '@/components';
import { SelectOption } from '@/interfaces';
import { colors, spacing } from '@/themes';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Text } from '@/components';

interface AlbumEntryProps {
  maxSelection?: number;
  albums: Album[];
  imagesSelected: string[];
  onSelect: (uris: string[]) => void;
  onClose: () => void;
}

const { height } = Dimensions.get('window');

const AlbumEntry = ({
  albums,
  maxSelection,
  imagesSelected,
  onSelect,
  onClose,
}: AlbumEntryProps) => {
  const defaultAlbumId = albums.reduce(
    (maxAlbum, album) =>
      album.assetCount > maxAlbum.assetCount ? album : maxAlbum,
    albums[0],
  ).id;
  const [selectedAlbumId, setSelectedAlbumId] =
    useState<string>(defaultAlbumId);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAssets, setSelectedAssets] =
    useState<string[]>(imagesSelected);

  const options: SelectOption[] = albums.map((album) => ({
    title: album.title,
    value: album.id,
  }));

  const translateY = useSharedValue(height / 2);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 500 });
  }, [translateY]);

  useEffect(() => {
    const selectedAlbum = albums.find((album) => album.id === selectedAlbumId);
    async function getAlbumAssets() {
      setLoading(true);
      const albumAssets = await getAssetsAsync({ album: selectedAlbum });
      setAssets(albumAssets.assets);
      setLoading(false);
    }
    getAlbumAssets();
  }, [albums, selectedAlbumId]);

  const handleSelectAlbum = (value: string) => {
    setSelectedAlbumId(value);
  };

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.translationY > 0) {
      translateY.value = nativeEvent.translationY;
      opacity.value = 1 - nativeEvent.translationY / (height * 0.5);
    }
  };

  const handleGestureEnd = ({ nativeEvent }: any) => {
    if (nativeEvent.translationY > height * 0.25) {
      translateY.value = withTiming(height / 2, { duration: 300 }, () => {
        runOnJS(onClose)();
      });
      opacity.value = withTiming(0);
    } else {
      translateY.value = withSpring(0);
      opacity.value = withTiming(1);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handleSelectImage = (id: string) => {
    setSelectedAssets((prev) => {
      const index = prev.indexOf(id);
      if (index > -1) {
        return prev.filter((item) => item !== id);
      }
      if (maxSelection && prev.length >= maxSelection) return prev;
      return [...prev, id];
    });
  };

  const handleAddPhotos = () => {
    translateY.value = withTiming(height / 2, { duration: 300 }, () => {
      runOnJS(onClose)();
    });
    opacity.value = withTiming(0);
    onSelect(selectedAssets);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onEnded={handleGestureEnd}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.dragIndicator} />
          <Select
            value={albums.find((a) => a.id === selectedAlbumId)?.title}
            data={options}
            onSelect={handleSelectAlbum}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={assets}
              keyExtractor={(item) => item.id}
              numColumns={3}
              contentContainerStyle={styles.assetList}
              renderItem={({ item }) => {
                const selectedIndex = selectedAssets.indexOf(item.id);
                const isDisabled =
                  !!maxSelection &&
                  selectedAssets.length >= maxSelection &&
                  selectedIndex === -1;
                const handlePressImage = () => handleSelectImage(item.id);
                return (
                  <Pressable
                    onPress={handlePressImage}
                    style={styles.imageContainer}
                    disabled={isDisabled}
                  >
                    <Image source={{ uri: item.uri }} style={styles.image} />
                    {selectedIndex > -1 && (
                      <View style={styles.selectedOverlay}>
                        <Text style={styles.selectedText}>
                          {selectedIndex + 1}
                        </Text>
                      </View>
                    )}
                    {isDisabled && <View style={styles.disabledOverlay} />}
                  </Pressable>
                );
              }}
            />
          )}
          {selectedAssets.length > 0 && (
            <Button
              title="Add Photos"
              size="lg"
              style={styles.button}
              onPress={handleAddPhotos}
            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default AlbumEntry;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white1,
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  select: {
    width: '100%',
    marginBottom: 12,
  },
  assetList: {
    gap: 8,
    paddingTop: 8,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 4,
  },
  selectedOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    bottom: spacing[3],
  },
  disabledOverlay: {
    position: 'absolute',
    width: 100,
    height: 100,
    margin: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
});
