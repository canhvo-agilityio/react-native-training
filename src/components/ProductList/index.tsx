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
      contentContainerStyle={styles.space}
      getItemLayout={(data, index) => ({
        length: 157,
        offset: 157 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  columnProduct: {
    columnGap: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  space: {
    paddingBottom: 140,
  },
});

export default memo(ProductList);
