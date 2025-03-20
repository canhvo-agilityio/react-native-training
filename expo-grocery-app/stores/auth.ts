import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/interfaces';

export interface AuthStates {
  user: User;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setUser: (user: User) => void;
  logout: () => void;
}

export const INITIAL_AUTH_STATE: AuthStates = {
  isAuthenticated: false,
  user: {
    id: '',
    storeId: '',
    email: '',
    storeName: '',
  },
};

export const useAuthStore = create<AuthStates & AuthActions>()(
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,
      setUser: (user: User) => set(() => ({ user, isAuthenticated: true })),
      logout: async () => {
        await AsyncStorage.removeItem('auth-store');
        set(() => ({
          user: { id: '', storeId: '', email: '', storeName: '' },
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
