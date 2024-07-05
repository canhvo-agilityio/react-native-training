import { CategoryItemType } from '@/types';
import { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text';
import { colors } from '@/themes';

interface CategoryItemProps {
  item: CategoryItemType;
  isActive: boolean;
  onPress: (id: string) => void;
}

const CategoryItem = ({ item, isActive, onPress }: CategoryItemProps) => (
  <TouchableOpacity
    testID="category"
    activeOpacity={1}
    style={styles.wrapper}
    onPress={() => onPress(item.id)}>
    <View style={{ ...styles.image, ...(isActive && styles.imageActive) }}>
      <Image source={item.image} alt={item.label} />
    </View>
    <Text
      color={isActive ? colors.background.primary : colors.border.quinary}
      value={item.label}
    />
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  wrapper: {
    rowGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    width: 36,
    height: 36,
    backgroundColor: colors.background.tertiary,
  },
  imageActive: {
    backgroundColor: colors.background.secondary,
  },
});

export default memo(CategoryItem);
