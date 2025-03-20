import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, patch, post, remove } from '@/utils';
import { API_URL, ENDPOINTS } from '@/constants';
import { Product, ProductDetails, ProductRequest } from '@/interfaces';
import { INIT_PRODUCT } from '@/mocks';

export const useFetchProducts = (endpoint: string) => {
  return useQuery<Product[]>({
    queryKey: [endpoint],
    queryFn: () => get(`${API_URL.BASE_URL}${endpoint}`),
    initialData: INIT_PRODUCT,
  });
};

export const useFetchProductsByCategoryId = (id: string) => {
  return useQuery<Product[]>({
    queryKey: [ENDPOINTS.PRODUCTS],
    queryFn: () =>
      get(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?categoryId=${id}`),
    initialData: INIT_PRODUCT,
  });
};

export const useFetchProductDetail = (id: string) => {
  return useQuery<ProductDetails>({
    queryKey: [ENDPOINTS.PRODUCTS + 'details'],
    queryFn: () => get(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/${id}`),
    initialData: INIT_PRODUCT[0],
  });
};

export const useFetchProductsByStoreId = (id: string) => {
  return useQuery<Product[]>({
    queryKey: [ENDPOINTS.STORES + 'products'],
    queryFn: () =>
      get(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?storeId=${id}`),
    initialData: INIT_PRODUCT,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductDetails, Error, ProductRequest>({
    mutationFn: (data: ProductRequest) => {
      return post<ProductRequest, ProductDetails>(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}`,
        data,
      );
    },
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(
        [ENDPOINTS.STORES + 'products'],
        (oldData) => {
          if (!oldData) return [newProduct];
          return [newProduct, ...oldData];
        },
      );
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ProductDetails,
    Error,
    { id: string; data: Partial<ProductDetails> }
  >({
    mutationFn: ({ id, data }) => {
      return patch<Partial<ProductDetails>, ProductDetails>(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/${id}`,
        data,
      );
    },
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData<Product[]>(
        [ENDPOINTS.STORES + 'products'],
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.map((product) =>
            product.id === updatedProduct.id
              ? { ...product, ...updatedProduct }
              : product,
          );
        },
      );

      queryClient.setQueryData<ProductDetails>(
        [ENDPOINTS.PRODUCTS + 'details', { id: updatedProduct.id }],
        updatedProduct,
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return remove(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/${id}`);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<Product[]>(
        [ENDPOINTS.STORES + 'products'],
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.filter((product) => product.id !== id);
        },
      );
    },
  });
};
