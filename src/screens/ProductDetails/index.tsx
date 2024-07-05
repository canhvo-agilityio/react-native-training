import { Button, Quantity, Text } from '@/components';
import { ChevronLeft, Favorite, Star } from '@/components/icons';
import { SCREENS } from '@/constants';
import { AppStackScreenProps } from '@/interfaces';
import { PRODUCTS } from '@/mocks';
import { colors, flexStyle, fontFamilies, lineHeights } from '@/themes';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

type ProductDetailsScreenProps = AppStackScreenProps<
  typeof SCREENS.PRODUCT_DETAILS
>;

interface color {
  id: string;
  color: string;
}

const COLORS: color[] = [
  {
    id: 'c01',
    color: colors.common.white,
  },
  {
    id: 'c02',
    color: colors.background.quaternary,
  },
  {
    id: 'c03',
    color: colors.background.quinary,
  },
];

export const ProductDetailsScreen = ({
  // route,
  navigation,
}: ProductDetailsScreenProps) => {
  const handlePressBack = () => {
    navigation.goBack();
  };

  const { image, name, price, description } = PRODUCTS[0];
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity
          style={{ ...styles.backIcon, ...styles.imageContainerCommon }}
          onPress={handlePressBack}>
          <ChevronLeft />
        </TouchableOpacity>
        <View style={{ ...styles.colorGroup, ...styles.imageContainerCommon }}>
          {COLORS.map(({ id, color }: color) => (
            <View
              key={id}
              style={{
                ...styles.color,
                borderColor:
                  id === 'c01'
                    ? colors.border.tertiary
                    : colors.border.quaternary,
                backgroundColor: color,
              }}
            />
          ))}
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text value={name} variant="title" size="xl" style={styles.name} />
        <View style={{ ...styles.flexRow, ...styles.priceGroup }}>
          <Text value={`$ ${price}`} variant="title" size="2xl" />
          <Quantity quantity={1} />
        </View>
        <View style={{ ...styles.flexRow, ...styles.ratingGroup }}>
          <Star />
          <Text value="4.5" style={styles.rating} variant="title" size="md" />
          <Text value="(50 reviews)" />
        </View>
        <Text value={description} variant="description" />
        <View style={{ ...flexStyle, ...styles.productAction }}>
          <TouchableOpacity style={styles.favorite}>
            <Favorite />
          </TouchableOpacity>
          <Button text="Add to cart" size="xl" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },
  imageContainer: {
    paddingLeft: 50,
  },
  image: {
    height: 420,
    borderBottomLeftRadius: 50,
  },
  imageContainerCommon: {
    backgroundColor: colors.common.white,
    shadowColor: '#8A959E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  backIcon: {
    borderRadius: 6,
    height: 36,
    width: 36,
    left: 33,
    top: 53,
  },
  colorGroup: {
    width: 64,
    height: 192,
    borderRadius: 40,
    gap: 30,
    left: 20,
    bottom: 100,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 16,
    borderWidth: 4,
  },
  productInfo: {
    paddingHorizontal: 25,
    gap: 10,
  },
  name: {
    fontFamily: fontFamilies.GelasioMedium,
    lineHeight: lineHeights.xl,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceGroup: {
    justifyContent: 'space-between',
  },
  ratingGroup: {
    gap: 10,
  },
  rating: {
    marginRight: 10,
    fontFamily: fontFamilies.NunitoSansBold,
  },
  favorite: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.border.quaternary,
  },
  productAction: {
    gap: 15,
    marginTop: 10,
  },
});
