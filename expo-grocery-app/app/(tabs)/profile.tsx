import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CartIcon, HeartIcon, Text } from '@/components';
import { colors, spacing } from '@/themes';
import { useAuthStore } from '@/stores';
import { router } from 'expo-router';
import { ROUTES } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

export default function ProfileScreen() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    router.push(ROUTES.LOGIN);
    queryClient.clear();
  };

  const menuItems = [
    {
      id: '1',
      title: 'Edit Profile',
      onPress: () => {},
    },
    {
      id: '2',
      title: 'Language & Currency',
      onPress: () => {},
    },
    {
      id: '3',
      title: 'Feedback',
      onPress: () => {},
    },
    {
      id: '4',
      title: 'Refer a Friend',
      onPress: () => {},
    },
    {
      id: '5',
      title: 'Terms & Conditions',
      onPress: () => {},
    },
    {
      id: '6',
      title: 'Logout',
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text variant="heading" size="xl">
            My Store
          </Text>
          <View style={styles.iconGroup}>
            <HeartIcon />
            <CartIcon />
          </View>
        </View>
        <View style={styles.nameGroup}>
          <View style={styles.name}>
            <Text variant="heading" size="xl">
              T
            </Text>
          </View>
          <View style={styles.info}>
            <Text variant="heading">Tradly Team</Text>
            <Text style={styles.infoText}>+1 9998887776</Text>
            <Text style={styles.infoText}>info@tradly.co</Text>
          </View>
        </View>
      </View>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              item.title !== 'Logout' && styles.borderStyle,
            ]}
            onPress={item.onPress}
          >
            <Text style={item.title === 'Logout' && styles.logoutText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  header: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing[4],
    height: '50%',
    gap: spacing[4],
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  nameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  name: {
    width: spacing[16],
    height: spacing[16],
    borderRadius: spacing[8],
    borderColor: colors.white1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    gap: spacing[1],
  },
  infoText: {
    color: colors.white1,
  },
  menuContainer: {
    backgroundColor: colors.white1,
    paddingHorizontal: spacing[5],
    borderRadius: spacing[3],
    paddingVertical: spacing[2.5],
    elevation: 3,
    position: 'absolute',
    width: '90%',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
  menuItem: {
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[5],
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.borderPrimary,
  },
  logoutText: {
    color: colors.text.primary,
  },
});
