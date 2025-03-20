import { useAuthStore, INITIAL_AUTH_STATE } from '../auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset Zustand store state before each test
    useAuthStore.setState(INITIAL_AUTH_STATE);
  });

  it('should initialize with the default state', () => {
    const state = useAuthStore.getState();
    expect(state).toEqual({
      ...INITIAL_AUTH_STATE,
      setUser: expect.any(Function),
      logout: expect.any(Function),
    });
  });

  it('should set user and update isAuthenticated to true', () => {
    const mockUser = {
      id: '123',
      storeId: '456',
      email: 'test@example.com',
      storeName: 'Test Store',
    };

    useAuthStore.getState().setUser(mockUser);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should reset user and isAuthenticated to false on logout', async () => {
    const mockUser = {
      id: '123',
      storeId: '456',
      email: 'test@example.com',
      storeName: 'Test Store',
    };

    // Set user first
    useAuthStore.getState().setUser(mockUser);

    // Call logout
    await useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toEqual(INITIAL_AUTH_STATE.user);
    expect(state.isAuthenticated).toBe(false);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('auth-store');
  });

  it('should persist the state to AsyncStorage', async () => {
    const mockUser = {
      id: '123',
      storeId: '456',
      email: 'test@example.com',
      storeName: 'Test Store',
    };

    useAuthStore.getState().setUser(mockUser);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
