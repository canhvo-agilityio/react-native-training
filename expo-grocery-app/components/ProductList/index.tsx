import { Product } from '@/interfaces';
import { memo, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import isEqual from 'react-fast-compare';
import ProductCard from '../ProductCard';
import { spacing } from '@/themes';

interface ProductListProps {
  data: Product[];
  isGrid?: boolean;
  isEditing?: boolean;
  isRefreshing?: boolean;
  isFetchingMore?: boolean;
  onPress: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRefresh?: () => void;
  onEndReached?: () => void;
}

const ProductList = ({
  data,
  isGrid = false,
  isEditing = false,
  isFetchingMore = false,
  isRefreshing = false,
  onPress,
  onEdit,
  onDelete,
  onRefresh,
  onEndReached,
}: ProductListProps) => {
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
        isEditing={isEditing}
        onEdit={onEdit}
        onDelete={onDelete}
        onPress={onPress}
      />
    ),
    [isEditing, onDelete, onEdit, onPress],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={getKeyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      horizontal={!isGrid}
      numColumns={isGrid ? 2 : 1}
      columnWrapperStyle={isGrid ? styles.columnProduct : undefined}
      showsHorizontalScrollIndicator={false}
      maxToRenderPerBatch={6}
      windowSize={6}
      updateCellsBatchingPeriod={100}
      removeClippedSubviews={true}
      onEndReachedThreshold={0.3}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      ListFooterComponent={
        isFetchingMore ? <ActivityIndicator size="small" /> : null
      }
      onEndReached={onEndReached}
      contentContainerStyle={isGrid ? styles.listContainer : undefined}
    />
  );
};

const styles = StyleSheet.create({
  columnProduct: {
    paddingBottom: spacing[2.5],
  },
  listContainer: {
    paddingBottom: 200,
  },
});

export default memo(ProductList, isEqual);
