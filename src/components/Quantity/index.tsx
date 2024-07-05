import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Decrease, Increase } from '../icons';
import Text from '../Text';
import { colors, fontFamilies } from '@/themes';
import { memo } from 'react';

const Quantity = ({ quantity }: { quantity: number }) => (
  <View style={styles.quantityGroup}>
    <TouchableOpacity style={styles.quantityAction}>
      <Decrease />
    </TouchableOpacity>
    <Text value={quantity} size="md" style={styles.quantity} />
    <TouchableOpacity style={styles.quantityAction}>
      <Increase />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  quantityGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityAction: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.border.quaternary,
    borderRadius: 6,
  },
  quantity: {
    color: colors.primary,
    fontFamily: fontFamilies.NunitoSansSemiBold,
  },
});

export default memo(Quantity);
