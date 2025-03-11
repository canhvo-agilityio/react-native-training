import { useQuery } from '@tanstack/react-query';
import { get } from '@/utils';
import { API_URL, ENDPOINTS } from '@/constants';
import { Product } from '@/interfaces';
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
  return useQuery<Product>({
    queryKey: [ENDPOINTS.PRODUCTS + 'details'],
    queryFn: () => get(`${API_URL.BASE_URL}${ENDPOINTS.PRODUCTS}/${id}`),
    initialData: INIT_PRODUCT[0],
  });
};
