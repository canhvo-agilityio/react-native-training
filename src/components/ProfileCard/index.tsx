import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from '../icons';
import Text from '../Text';
import { colors, fontFamilies } from '@/themes';

interface ProfileCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

const ProfileCard = ({ title, description, onPress }: ProfileCardProps) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.content}>
      <Text variant="title" size="md" value={title} style={styles.title} />
      <Text variant="description" size="xs" value={description} />
    </View>
    <ChevronRight />
  </TouchableOpacity>
);

export default memo(ProfileCard);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.common.white,
    shadowColor: '#8A959E',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  content: {
    gap: 5,
  },
  title: {
    fontFamily: fontFamilies.NunitoSansBold,
  },
});
