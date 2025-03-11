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
import { CATEGORIES } from '@/constants';
import { useFetchProductsByCategoryId } from '@/hooks';

export default function ProductsByCategory() {
  const { id } = useLocalSearchParams();
  const categoryId = Array.isArray(id) ? id[0] : id;
  const { data, isFetching, error } = useFetchProductsByCategoryId(categoryId);

  const handlePressProduct = (id: string) => {
    //TODO
  };

  const handlePressBackIcon = () => {
    router.back();
  };

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
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.list}>
          {error && <Text>Error when load products</Text>}
          <ProductList data={data} onPress={handlePressProduct} isGrid />
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
