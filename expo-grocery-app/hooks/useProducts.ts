import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { get, patch, post, remove } from '@/utils';
import { API_URL, ENDPOINTS } from '@/constants';
import { Product, ProductDetails, ProductRequest } from '@/interfaces';
import { INIT_PRODUCT } from '@/mocks';

export const useFetchProducts = (endpoint: string) => {
  return useQuery<Product[]>({
    queryKey: [endpoint],
    queryFn: () => get(`${API_URL.BASE_URL}${endpoint}`),
  });
};

export const useFetchProductsByCategoryId = (id: string) => {
  return useQuery<Product[]>({
    queryKey: [ENDPOINTS.PRODUCTS, id, 'page 1'],
    queryFn: () =>
      get(
        `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?categoryId=${id}&_page=${1}&_limit=${10}`,
      ),
    placeholderData: (previousData) => previousData ?? INIT_PRODUCT,
    retry: 2,
  });
};

export const useInfiniteByCategoryId = (id: string, limit: number) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest } =
    useInfiniteQuery<Product[]>({
      queryKey: [ENDPOINTS.PRODUCTS, id, 'another page'],
      queryFn: ({ pageParam = 2 }) =>
        get(
          `${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?categoryId=${id}&_page=${pageParam}&_limit=${limit}`,
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      retry: 2,
      gcTime: 0,
    });
  return {
    data: data?.pages.flatMap((page) => page) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};

export const useFetchProductDetail = (id: string) => {
  return useQuery<ProductDetails>({
    queryKey: [ENDPOINTS.PRODUCTS + 'details', id],
    queryFn: () => get(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/${id}`),
    placeholderData: (previousData) => previousData ?? INIT_PRODUCT[0],
    retry: 2,
  });
};

export const useFetchProductsByStoreId = (id: string) => {
  return useQuery<Product[]>({
    queryKey: [ENDPOINTS.STORES, 'my-store'],
    queryFn: () =>
      get(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}?storeId=${id}`),
    placeholderData: (previousData) => previousData ?? INIT_PRODUCT,
    retry: 2,
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
        [ENDPOINTS.STORES, 'my-store'],
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
        [ENDPOINTS.STORES, 'my-store'],
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
        [ENDPOINTS.PRODUCTS + 'details', updatedProduct.id],
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
        [ENDPOINTS.STORES, 'my-store'],
        (oldData) => {
          if (!oldData) return oldData;
          return oldData.filter((product) => product.id !== id);
        },
      );
    },
  });
};
