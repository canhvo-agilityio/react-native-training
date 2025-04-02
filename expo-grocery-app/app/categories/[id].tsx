import {
  Button,
  ChevronLeftIcon,
  LocationIcon,
  MenuIcon,
  ProductList,
  SortIcon,
  Text,
} from '@/components';
import { router, useLocalSearchParams } from 'expo-router';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing } from '@/themes';
import { CATEGORIES, ROUTES } from '@/constants';
import { useInfiniteByCategoryId } from '@/hooks';
import { useCallback } from 'react';

export default function ProductsByCategory() {
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
    isRefetching,
    error,
  } = useInfiniteByCategoryId(categoryId, 10);

  const handlePressProduct = useCallback((id: string) => {
    router.push(ROUTES.PRODUCT_DETAILS(id));
  }, []);

  const handlePressBackIcon = () => {
    router.back();
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <TouchableOpacity onPress={handlePressBackIcon}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <Text variant="heading" size="xl" style={styles.title}>
            {CATEGORIES[Number(id)]}
          </Text>
        </View>
        <View style={styles.iconGroup}>
          <Button
            icon={<SortIcon />}
            title="Sort by"
            variant="outlined"
            size="md"
          />
          <Button
            icon={<LocationIcon />}
            title="Location"
            variant="outlined"
            size="md"
          />
          <Button
            icon={<MenuIcon />}
            title="Category"
            variant="outlined"
            size="md"
          />
        </View>
      </View>
      {isLoading && !isRefetching ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.list}>
          {error && <Text>Error when load products</Text>}
          <ProductList
            data={data}
            onPress={handlePressProduct}
            isFetchingMore={isFetchingNextPage}
            isGrid
            isRefreshing={isRefetching}
            onRefresh={handleRefresh}
            onEndReached={handleEndReached}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background.tertiary,
    gap: spacing[7.5],
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    gap: spacing[8],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  titleGroup: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
