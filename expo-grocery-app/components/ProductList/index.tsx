import { Product } from '@/interfaces';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
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
  const handlePress = useCallback((id: string) => onPress(id), [onPress]);
  const handleEdit = useCallback((id: string) => onEdit?.(id), [onEdit]);
  const handleDelete = useCallback((id: string) => onDelete?.(id), [onDelete]);
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
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPress={handlePress}
      />
    ),
    [handleDelete, handleEdit, handlePress, isEditing],
  );

  return (
    <FlatList
      data={data}
      keyExtractor={getKeyExtractor}
      renderItem={renderItem}
      horizontal={!isGrid}
      numColumns={isGrid ? 2 : 1}
      columnWrapperStyle={isGrid ? styles.columnProduct : undefined}
      showsHorizontalScrollIndicator={false}
      windowSize={3}
      removeClippedSubviews={true}
      onEndReachedThreshold={0.1}
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

export default ProductList;
