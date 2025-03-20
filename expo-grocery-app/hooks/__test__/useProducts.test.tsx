import { renderHook, act, waitFor } from '@testing-library/react-native';
import {
  useFetchProducts,
  useFetchProductsByCategoryId,
  useFetchProductDetail,
  useFetchProductsByStoreId,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../useProducts';
import { get, post, patch, remove } from '@/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { INIT_PRODUCT } from '@/mocks';
import { API_URL, ENDPOINTS } from '@/constants';

jest.mock('@/utils', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('@/constants', () => ({
  API_URL: {
    BASE_URL: 'https://api.example.com',
  },
  ENDPOINTS: {
    PRODUCTS: '/products',
  },
}));

describe('useProducts hooks', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.resetQueries();
  });

  describe('useFetchProducts', () => {
    it('should return initial data before fetching', async () => {
      (get as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useFetchProducts('/products'), {
        wrapper,
      });

      expect(result.current.data).toEqual(INIT_PRODUCT);
    });

    it('should fetch and return products successfully', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
      ];
      (get as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useFetchProducts('/products'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.data).toEqual(mockProducts));

      expect(get).toHaveBeenCalledWith(`${API_URL.BASE_URL}/products`);
    });

    // it('should handle API errors', async () => {
    //   (get as jest.Mock).mockRejectedValue(new Error('Network error'));

    //   const { result } = renderHook(() => useFetchProducts('/products'), {
    //     wrapper,
    //   });

    //   await waitFor(() => {
    //     expect(result.current.isError).toBe(true);
    //     expect(result.current.error?.message).toBe('Network error');
    //   });
    // });
  });

  describe('useFetchProductsByCategoryId', () => {
    it('should return initial data before fetching', async () => {
      (get as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useFetchProductsByCategoryId('1'), {
        wrapper,
      });

      expect(result.current.data).toEqual(INIT_PRODUCT);
    });

    it('should fetch and return products successfully', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
      ];
      (get as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useFetchProductsByCategoryId('1'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.data).toEqual(mockProducts));

      expect(get).toHaveBeenCalledWith(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?categoryId=1`,
      );
    });
  });

  describe('useFetchProductDetail', () => {
    it('should return initial data before fetching', async () => {
      (get as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useFetchProductDetail('/1'), {
        wrapper,
      });

      expect(result.current.data).toEqual(INIT_PRODUCT[0]);
    });

    it('should fetch and return products successfully', async () => {
      const mockProducts = { id: 1, name: 'Product A' };
      (get as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useFetchProductDetail('1'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.data).toEqual(mockProducts));

      expect(get).toHaveBeenCalledWith(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/1`,
      );
    });
  });

  describe('useFetchProductsByStoreId', () => {
    it('should return initial data before fetching', async () => {
      (get as jest.Mock).mockResolvedValue([]);

      const { result } = renderHook(() => useFetchProductsByStoreId('1'), {
        wrapper,
      });

      expect(result.current.data).toEqual(INIT_PRODUCT);
    });

    it('should fetch and return products successfully', async () => {
      const mockProducts = [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
      ];
      (get as jest.Mock).mockResolvedValue(mockProducts);

      const { result } = renderHook(() => useFetchProductsByStoreId('1'), {
        wrapper,
      });

      await waitFor(() => expect(result.current.data).toEqual(mockProducts));

      expect(get).toHaveBeenCalledWith(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?storeId=1`,
      );
    });
  });

  describe('useAddProduct', () => {
    it('should add a product successfully', async () => {
      const mockProduct = { id: '1', name: 'New Product' };
      (post as jest.Mock).mockResolvedValue(mockProduct);

      const { result } = renderHook(() => useAddProduct(), { wrapper });

      await act(async () => {
        await result.current.mutateAsync({
          name: 'New Product',
          categoryId: 0,
          description: '',
          images: [],
          newPrice: 0,
          storeId: '',
          storeName: '',
        });
      });

      expect(post).toHaveBeenCalledWith(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}`,
        {
          name: 'New Product',
          categoryId: 0,
          description: '',
          images: [],
          newPrice: 0,
          storeId: '',
          storeName: '',
        },
      );
      expect(result.current.error).toBeNull();
    });
  });

  describe('useUpdateProduct', () => {
    it('should update a product successfully', async () => {
      const mockUpdatedProduct = { id: '1', name: 'Updated Product' };
      (patch as jest.Mock).mockResolvedValue(mockUpdatedProduct);

      const { result } = renderHook(() => useUpdateProduct(), { wrapper });

      await act(async () => {
        await result.current.mutateAsync({
          id: '1',
          data: { name: 'Updated Product' },
        });
      });

      expect(patch).toHaveBeenCalledWith(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/1`,
        { name: 'Updated Product' },
      );
      expect(result.current.error).toBeNull();
    });
  });

  describe('useDeleteProduct', () => {
    it('should delete a product successfully', async () => {
      (remove as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useDeleteProduct(), { wrapper });

      await act(async () => {
        await result.current.mutateAsync('1');
      });

      expect(remove).toHaveBeenCalledWith(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/1`,
      );
      expect(result.current.error).toBeNull();
    });
  });
});
