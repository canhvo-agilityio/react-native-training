import { ProfileCard, Text } from '@/components';
import { Logout, Search } from '@/components/icons';
import { PROFILES } from '@/constants';
import { colors, fontFamilies } from '@/themes';
import { ProfileMenu } from '@/types';
import { Image, StyleSheet, View } from 'react-native';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Search color={colors.text.primary} />
          <Text value="Profile" variant="heading" style={styles.title} />
          <Logout />
        </View>
      </View>
      <View style={styles.user}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={styles.avatar}
        />
        <View>
          <Text
            value="Bruno Pham"
            variant="title"
            size="lg"
            style={styles.userName}
          />
          <Text value="bruno203@gmail.com" variant="description" />
        </View>
      </View>
      <View style={styles.menu}>
        {PROFILES.map(({ id, title, description }: ProfileMenu) => (
          <ProfileCard
            key={id}
            title={title}
            description={description}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 18,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    gap: 5,
  },
  userName: {
    fontFamily: fontFamilies.NunitoSansBold,
  },
  menu: {
    marginTop: 30,
    gap: 15,
  },
});
