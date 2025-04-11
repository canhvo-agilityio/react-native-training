import { Product } from '@/interfaces';
import { PenIcon, Text, TrashIcon } from '@/components';
import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

type ProductCardProps = Pick<
  Product,
  'id' | 'name' | 'storeName' | 'oldPrice' | 'newPrice'
> & {
  imageUrl: string;
  isEditing?: boolean;
  onPress: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const ProductCard = ({
  id,
  imageUrl,
  name,
  newPrice,
  storeName,
  oldPrice,
  isEditing = false,
  onPress,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  const handlePress = () => onPress(id);
  const handleEdit = () => {
    onEdit && onEdit(id);
  };
  const handleDelete = () => {
    onDelete && onDelete(id);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      testID="product-card"
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
        {isEditing && (
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
              <PenIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
              <TrashIcon />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text variant="title" size="base">
          {name}
        </Text>
        <View style={styles.footer}>
          <View style={styles.storeGroup}>
            <View style={styles.storeLogo}>
              <Text variant="heading">{storeName.charAt(0).toUpperCase()}</Text>
            </View>
            <Text size="base" numberOfLines={1} style={styles.storeName}>
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
  imageContainer: {
    position: 'relative',
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
    width: spacing[10],
    overflow: 'visible',
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
  iconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    gap: spacing[10],
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
  iconButton: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: spacing[4],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const lazyProductCard = memo(ProductCard);
// lazyProductCard.whyDidYouRender = true;
export default lazyProductCard;
