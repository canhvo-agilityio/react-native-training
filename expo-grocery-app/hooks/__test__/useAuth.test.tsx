import { renderHook, act, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '..';
import { get } from '@/utils';
import { API_URL, ENDPOINTS, ERROR_MESSAGES } from '@/constants';

jest.mock('@/utils', () => ({
  get: jest.fn(),
}));

describe('useAuth', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should sign in successfully', async () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
    (get as jest.Mock).mockResolvedValue([mockUser]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.signIn({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(get).toHaveBeenCalledWith(
      `${API_URL.BASE_URL}${ENDPOINTS.USERS}?email=test@example.com&password=password123`,
    );
    expect(result.current.error).toBeNull();
  });

  it('should return an error when user is not found', async () => {
    (get as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.signIn({
        email: 'wrong@example.com',
        password: 'password123',
      });
    });

    expect(result.current.error).toBe(ERROR_MESSAGES.AUTH_INCORRECT);
  });

  it('should handle API errors', async () => {
    (get as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.signIn({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });
  });
});
