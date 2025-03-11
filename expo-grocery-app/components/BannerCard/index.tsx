import { colors, fontsFamily, fontWeights, spacing } from '@/themes';
import { memo } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Text from '../Text';

interface BannerCardProps {
  title: string;
  image: string;
}

const BannerCard = ({ title, image }: BannerCardProps) => {
  return (
    <ImageBackground
      source={{ uri: image }}
      style={styles.banner}
      imageStyle={styles.image}
    >
      <View style={styles.content}>
        <View style={styles.overlay} />
        <Text variant="heading" size="base" style={styles.title}>
          {title}
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>START SHOPPING</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default memo(BannerCard);

const styles = StyleSheet.create({
  banner: {
    width: 300,
    height: 165,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20,
    paddingHorizontal: spacing[5],
  },
  title: {
    width: 200,
    fontFamily: fontsFamily.semiBold,
    fontWeight: fontWeights.semiBold,
    lineHeight: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.white1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: colors.white1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
