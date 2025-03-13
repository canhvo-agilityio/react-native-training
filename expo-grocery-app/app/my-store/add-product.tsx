import { ChevronLeftIcon, ProductForm, Text } from '@/components';
import { colors, spacing } from '@/themes';
import { router } from 'expo-router';

import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';

export default function AddProduct() {
  const handlePressBackIcon = () => {
    router.back();
  };

  const handleSubmit = () => {
    //TODO
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <TouchableOpacity onPress={handlePressBackIcon}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <Text variant="heading" size="xl" style={styles.title}>
            Add Product
          </Text>
        </View>
      </View>

      {/* Form field */}
      <ProductForm onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  header: {
    backgroundColor: colors.primary,
    gap: spacing[8],
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
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
});
