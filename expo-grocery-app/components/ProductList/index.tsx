import { Product } from '@/interfaces';
import { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import isEqual from 'react-fast-compare';
import ProductCard from '../ProductCard';
import { spacing } from '@/themes';

interface ProductListProps {
  data: Product[];
  isGrid?: boolean;
  onPress: (id: string) => void;
}

const ProductList = ({ data, isGrid = false, onPress }: ProductListProps) => {
  const getKeyExtractor = useCallback((item: Product) => item.id, []);
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <ProductCard
        id={item.id}
        imageUrl={item.images[0]}
        name={item.name}
        newPrice={item.newPrice}
        storeName={item.storeName}
        oldPrice={item.oldPrice}
        onPress={onPress}
      />
    ),
    [onPress],
  );
  return (
    <FlatList
      data={data}
      keyExtractor={getKeyExtractor}
      renderItem={renderItem}
      initialNumToRender={6}
      horizontal={!isGrid}
      numColumns={isGrid ? 2 : 1}
      columnWrapperStyle={isGrid ? styles.columnProduct : undefined}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  columnProduct: {
    paddingBottom: spacing[2.5],
  },
});

export default memo(ProductList, isEqual);
