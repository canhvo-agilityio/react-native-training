import { useCallback, useState } from 'react';

// Components
import { ScrollView, StyleSheet, View } from 'react-native';
import { CategoryItem, ProductList, Text } from '@/components';

// Icons
import { Cart, Search } from '@/components/icons';

// Themes
import { colors, fontFamilies, lineHeights } from '@/themes';

// Types
import { CategoryItemType } from '@/types';
import { RootTabScreenProps } from '@/interfaces';

// Mocks
import { CATEGORIES, PRODUCTS } from '@/mocks';
import { SCREENS } from '@/constants';

type HomeScreenProps = RootTabScreenProps<typeof SCREENS.HOME>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [categoryActiveId, setCategoryActiveId] = useState(CATEGORIES[0].id);

  const handlePressCategory = useCallback((id: string) => {
    setCategoryActiveId(id);
  }, []);

  const handlePressProduct = (id: string) => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, { id });
  };

  const handlePressCartIcon = () => {
    navigation.navigate(SCREENS.CART);
  };

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
        <Cart onPress={handlePressCartIcon} />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((item: CategoryItemType) => (
          <CategoryItem
            key={item.id}
            item={item}
            isActive={categoryActiveId === item.id}
            onPress={handlePressCategory}
          />
        ))}
      </ScrollView>
      <ProductList
        data={PRODUCTS}
        onLoadMore={() => {}}
        onPress={handlePressProduct}
      />
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
    lineHeight: lineHeights.lg,
  },
  categoryList: {
    gap: 25,
    paddingLeft: 20,
  },
});
