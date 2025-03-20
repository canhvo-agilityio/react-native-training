export const ROUTES = {
  LOGIN: '/(auths)/login',
  HOME: '/(tabs)',
  BROWSE: '/(tabs)/browse',
  MY_STORE: '/(tabs)/my-store',
  ORDER_HISTORY: '/(tabs)/order-history',
  PROFILE: '/(tabs)/profile',
  CATEGORY: (id: number) => `/categories/${id}` as const,
  PRODUCT_DETAILS: (id: string) => `/products/${id}` as const,
  ADD_PRODUCT: '/my-store/add-product',
  EDIT_PRODUCT: '/my-store/edit-product',
} as const;
