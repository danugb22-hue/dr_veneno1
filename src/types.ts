export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'figura' | 'comic';
  subcategory?: 'dc' | 'marvel' | 'starwars' | 'lego' | 'anime';
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}
