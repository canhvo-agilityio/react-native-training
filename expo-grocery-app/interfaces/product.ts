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
