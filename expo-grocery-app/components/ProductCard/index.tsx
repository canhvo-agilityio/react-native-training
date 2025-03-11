import { Product } from '@/interfaces';
import { Text } from '@/components';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import React, { memo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

type ProductCardProps = Pick<
  Product,
  'id' | 'name' | 'storeName' | 'oldPrice' | 'newPrice'
> & {
  imageUrl: string;
  onPress: (id: string) => void;
};

const ProductCard = ({
  id,
  imageUrl,
  name,
  newPrice,
  storeName,
  oldPrice,
  onPress,
}: ProductCardProps) => {
  const handlePress = () => onPress(id);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text variant="title" size="base">
          {name}
        </Text>
        <View style={styles.footer}>
          <View style={styles.storeGroup}>
            <View style={styles.storeLogo}>
              <Text variant="heading">{storeName.charAt(0).toUpperCase()}</Text>
            </View>
            <Text size="base" style={styles.storeName}>
              {storeName}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            {oldPrice ? <Text style={styles.oldPrice}>${oldPrice}</Text> : null}
            <Text size="base" style={styles.price}>
              ${newPrice}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white1,
    borderRadius: 10,
    overflow: 'hidden',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    width: spacing[40],
    marginRight: spacing[2],
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing[3],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing[2],
  },
  storeName: {
    opacity: 0.5,
  },
  storeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  storeLogo: {
    width: spacing[6],
    height: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing[3],
    backgroundColor: colors.primary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  oldPrice: {
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
    color: colors.primary,
  },
});

export default memo(ProductCard);
