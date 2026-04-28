export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  tag?: string;
  description?: string;
  category: 'matcha' | 'coffee' | 'blend';
  caffeineLevel?: number;
  mood?: string[];
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
