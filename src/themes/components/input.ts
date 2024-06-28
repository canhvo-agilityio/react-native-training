import { StyleSheet, TextStyle } from 'react-native';
import { colors } from '../color';
import { fontFamilies, fontSizes, fontWeights } from '../typography';

export const inputBaseStyle: TextStyle = {
  color: colors.text.quaternary,
  fontFamily: fontFamilies.NunitoSansRegular,
  fontWeight: fontWeights.regular,
  fontSize: fontSizes.xmd,
};

export const inputVariants = StyleSheet.create({
  filled: {
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 10,
    shadowColor: '#8A959E',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
  },
  flushed: {
    borderBottomColor: colors.border.secondary,
    borderBottomWidth: 2,
    color: colors.text.quaternary,
  },
});
