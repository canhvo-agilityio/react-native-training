import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import {
  ImageBackground,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Text from '../Text';

interface CategoryItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface CategoryListProps {
  data: CategoryItem[];
  onPress: (id: number) => void;
}

const CategoryList = ({ data, onPress }: CategoryListProps) => {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / 4 - 1;

  return (
    <View style={styles.listContainer}>
      {data.map((item) => {
        const handlePress = () => onPress(item.id);
        return (
          <TouchableOpacity
            style={[styles.itemContainer, { width: itemWidth }]}
            key={item.id}
            onPress={handlePress}
          >
            <ImageBackground
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode="cover"
            >
              <View style={styles.overlay} />

              <Text variant="heading" size="xs" style={styles.text}>
                {item.title}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemContainer: {
    aspectRatio: 1,
    overflow: 'hidden',
    marginBottom: spacing.px,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    color: colors.text.light,
    fontSize: 11,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
    textAlign: 'center',
  },
});

export default CategoryList;
