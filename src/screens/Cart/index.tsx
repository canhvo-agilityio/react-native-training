import { Button, CartItem, Input, Text } from '@/components';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import { SCREENS } from '@/constants';
import { AppStackScreenProps } from '@/interfaces';
import { CARTS } from '@/mocks';
import { colors, fontFamilies } from '@/themes';
import { CartItem as CartItemType } from '@/types';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type CartScreenProps = AppStackScreenProps<typeof SCREENS.CART>;

export const CartScreen = ({ navigation }: CartScreenProps) => {
  const handlePressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <ChevronLeft onPress={handlePressBack} />
          <Text value="My cart" variant="heading" style={styles.title} />
        </View>
        <ScrollView contentContainerStyle={styles.cartList}>
          {CARTS.map((item: CartItemType, index) => (
            <View>
              {index !== 0 && <View style={styles.divider} />}
              <CartItem key={item.id} item={item} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <View style={styles.searchGroup}>
          <View style={styles.searchInput}>
            <Input
              value=""
              variant="filled"
              onChangeText={() => {}}
              placeholder="Enter your promo code"
            />
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <ChevronRight color={colors.common.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.totalPriceGroup}>
          <Text
            value="Total:"
            variant="description"
            size="lg"
            style={styles.totalPriceTitle}
          />
          <Text
            value="$ 95.00"
            variant="title"
            size="lg"
            style={styles.totalPriceTitle}
          />
        </View>
        <Button text="Check out" size="lg" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  cartList: {
    gap: 12,
    paddingTop: 14,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.quaternary,
    marginBottom: 12,
  },
  footer: {
    gap: 20,
  },
  searchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.common.white,
    shadowColor: '#8A959E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 20,
  },
  searchIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.text.primary,
  },
  totalPriceGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceTitle: {
    fontFamily: fontFamilies.NunitoSansBold,
  },
});
