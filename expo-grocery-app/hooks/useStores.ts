import { useQuery } from '@tanstack/react-query';
import { get } from '@/utils';
import { API_URL, ENDPOINTS } from '@/constants';
import { Store } from '@/interfaces';
import { INIT_STORE } from '@/mocks';

export const useFetchStoreByUserId = (userId: string) => {
  return useQuery<Store[]>({
    queryKey: [ENDPOINTS.PRODUCTS],
    queryFn: () =>
      get(`${API_URL.BASE_URL}${ENDPOINTS.STORES}?userId=${userId}`),
    initialData: INIT_STORE,
  });
};
