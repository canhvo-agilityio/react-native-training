import { Product } from '@/types';
import { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text';
import { colors, fontFamilies } from '@/themes';

interface ProductCardProps {
  item: Product;
  onPress: () => void;
}

const ProductCard = ({
  item: { price, name, image },
  onPress,
}: ProductCardProps) => (
  <TouchableOpacity
    testID="product"
    style={{ ...styles.wrapper }}
    onPress={onPress}>
    <View>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.iconWarper}>
        <View style={styles.overlay} />
        <Image source={require('@/assets/icons/bag.png')} />
      </View>
    </View>
    <View>
      <Text value={name} variant="description" />
      <Text value={`$ ${price}`} style={styles.price} />
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  wrapper: {
    gap: 5,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 190,
    borderRadius: 12,
  },
  price: {
    fontFamily: fontFamilies.NunitoSansBold,
    color: colors.text.primary,
  },
  iconWarper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  icon: {
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.text.secondary,
    opacity: 0.4,
    borderRadius: 6,
  },
});

export default memo(ProductCard);
