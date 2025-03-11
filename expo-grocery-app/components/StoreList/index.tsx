import { memo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import isEqual from 'react-fast-compare';
import StoreCard from '../StoreCard';

interface Store {
  id: string;
  image: string;
  storeName: string;
}

interface ProductListProps {
  data: Store[];
}

const StoreList = ({ data }: ProductListProps) => {
  const getKeyExtractor = useCallback((item: Store) => item.id, []);
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Store>) => (
      <StoreCard image={item.image} storeName={item.storeName} />
    ),
    [],
  );
  return (
    <FlatList
      data={data}
      keyExtractor={getKeyExtractor}
      renderItem={renderItem}
      initialNumToRender={6}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(StoreList, isEqual);
