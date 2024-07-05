export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  rating?: number;
}

export type CartItem = Omit<Product, 'description' | 'rating'> & {
  quantity: number;
};
