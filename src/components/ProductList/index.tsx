import { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';

import { Product } from '@/types';

import ProductCard from '../ProductCard';

interface ProductListProps {
  data: Product[];
  onLoadMore: () => void;
  onPress: (id: string) => void;
}

const ProductList = ({ data, onLoadMore, onPress }: ProductListProps) => {
  const getKeyExtractor = useCallback(({ id }: Product) => id, []);

  const renderItemProduct = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => {
      const handleNavigateProductDetail = () => {
        onPress(item.id);
      };
      // navigation.navigate(SCREENS.PRODUCT_DETAIL, { product: item });

      return <ProductCard item={item} onPress={handleNavigateProductDetail} />;
    },
    [onPress],
  );

  return (
    <FlatList
      data={data}
      onEndReached={onLoadMore}
      keyExtractor={getKeyExtractor}
      renderItem={renderItemProduct}
      initialNumToRender={4}
      numColumns={2}
      columnWrapperStyle={styles.columnProduct}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  columnProduct: {
    columnGap: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default memo(ProductList);
