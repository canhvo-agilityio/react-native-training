import { Text } from '@/components';
import { Cart, Search } from '@/components/icons';
import { colors, fontFamilies } from '@/themes';
import { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface CategoryItemType {
  id: string;
  label: string;
  image: string;
}

export const CATEGORIES: CategoryItemType[] = [
  {
    id: '01',
    label: 'Polular',
    image: '@/assets/icons/star.png',
  },
  {
    id: '02',
    label: 'Chair',
    image: '@/assets/icons/chair.png',
  },
  {
    id: '03',
    label: 'Table',
    image: '@/assets/icons/table.png',
  },
  {
    id: '04',
    label: 'ArmChair',
    image: '@/assets/icons/armchair.png',
  },
  {
    id: '05',
    label: 'Bed',
    image: '@/assets/icons/bed.png',
  },
  {
    id: '06',
    label: 'Lamp',
    image: '@/assets/icons/lamp.png',
  },
];

export const HomeScreen = () => {
  const [categoryActiveId, setCategoryActiveId] = useState(CATEGORIES[0].id);

  const handlePressCategory = useCallback((id: string) => {
    setCategoryActiveId(id);
  }, []);

  const renderCategoryItem = (
    item: CategoryItemType,
    isActive: boolean,
    onPress: (id: string) => void,
  ) => (
    <TouchableOpacity
      testID="category"
      activeOpacity={1}
      style={{ ...styles.wrapper }}
      onPress={() => onPress(item.id)}>
      <View style={{ ...styles.image, ...(isActive && styles.imageActive) }}>
        <Image source={require('@/assets/icons/star.png')} alt={item.label} />
      </View>
      <Text
        color={isActive ? colors.background.primary : colors.border.quinary}
        value={item.label}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Search />
        <View style={styles.headerTitle}>
          <Text
            value="Make home"
            variant="description"
            size="md"
            style={styles.subTitle}
          />
          <Text
            value="BEAUTIFUL"
            variant="subTitle"
            size="md"
            color={colors.text.primary}
          />
        </View>
        <Cart />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((item: any) =>
          renderCategoryItem(
            item,
            categoryActiveId === item.id,
            handlePressCategory,
          ),
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    alignItems: 'center',
  },
  subTitle: {
    fontFamily: fontFamilies.GelasioRegular,
    color: colors.text.quaternary,
  },
  wrapper: {
    rowGap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    width: 44,
    height: 44,
    backgroundColor: colors.background.tertiary,
  },
  imageActive: {
    backgroundColor: colors.background.secondary,
  },
  categoryList: {
    columnGap: 25,
    paddingLeft: 20,
  },
});
