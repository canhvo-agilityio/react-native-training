export interface Product {
  id: string;
  name: string;
  oldPrice?: number;
  newPrice: number;
  discount?: number;
  images: string[];
  description: string;
  storeName: string;
  storeId: string;
  categoryId: number;
}

export interface ProductDetails extends Product {
  location?: string;
  additionalDetails?: string;
  priceType?: string;
}

export type ProductRequest = Omit<ProductDetails, 'id'>;
