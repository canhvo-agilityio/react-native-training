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
import { PRODUCT_CARD_HEIGHT } from '@/constants';

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
      maxToRenderPerBatch={10}
      windowSize={5}
      updateCellsBatchingPeriod={50}
      removeClippedSubviews={true}
      onEndReachedThreshold={0.2}
      getItemLayout={(_, index) => ({
        length: PRODUCT_CARD_HEIGHT,
        offset: PRODUCT_CARD_HEIGHT * index,
        index,
      })}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      ListFooterComponent={
        isFetchingMore ? (
          <ActivityIndicator size="small" style={styles.loader} />
        ) : null
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
  loader: {
    marginVertical: 20,
  },
  listContainer: {
    paddingBottom: 200,
  },
});

export default memo(ProductList, isEqual);
