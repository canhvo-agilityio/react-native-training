import { StyleSheet, TextStyle } from 'react-native';
import { colors } from '../color';
import { fontFamilies, fontSizes, fontWeights } from '../typography';

export const inputBaseStyle: TextStyle = {
  color: colors.text.quaternary,
  fontFamily: fontFamilies.NunitoSansRegular,
  fontWeight: fontWeights.regular,
  fontSize: fontSizes.xmd,
  paddingVertical: 11,
  flex: 1,
};

export const inputVariants = StyleSheet.create({
  filled: {
    borderRadius: 10,
  },
  flushed: {
    borderBottomColor: colors.border.secondary,
    borderBottomWidth: 2,
    color: colors.text.quaternary,
  },
});
