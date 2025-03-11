import { colors, spacing } from '@/themes';
import { Text } from '../Text';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../Button';

interface StoreCardProps {
  image: string;
  storeName: string;
}

const StoreCard: React.FC<StoreCardProps> = ({ image, storeName }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {storeName.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.content}>
        <Text variant="title" size="base">
          {storeName}
        </Text>
        <Button title="Follow" size="sm" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowRadius: 4,
    width: spacing[40],
    alignItems: 'center',
    marginRight: spacing[2],
  },
  image: {
    width: '100%',
    height: 100,
  },
  content: {
    alignItems: 'center',
    gap: spacing[3],
    marginTop: spacing[12],
    paddingBottom: spacing[6],
  },
  avatar: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: '50%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: spacing.px,
    borderColor: colors.white1,
    position: 'absolute',
    bottom: spacing[25],
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default StoreCard;
