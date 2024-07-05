import { CartItem as CartItemType } from '@/types';
import { Image, StyleSheet, View } from 'react-native';
import Text from '../Text';
import Quantity from '../Quantity';
import { memo } from 'react';
import { TimesCircle } from '../icons';
import { colors, fontFamilies } from '@/themes';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { image, price, quantity, name } = item || {};
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.detail}>
          <Text value={name} style={styles.name} />
          <Text value={`$ ${price}`} size="xmd" style={styles.price} />
          <Quantity quantity={quantity} />
        </View>
      </View>
      <TimesCircle />
    </View>
  );
};

export default memo(CartItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
    gap: 20,
  },
  detail: {
    justifyContent: 'space-between',
  },
  name: {
    color: colors.border.quinary,
    fontFamily: fontFamilies.NunitoSansSemiBold,
  },
  price: {
    fontFamily: fontFamilies.NunitoSansBold,
    color: colors.primary,
  },
});
