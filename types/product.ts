export interface Product {
  _id: string;
  title: string;
  category: string;
  subCategory: string;
  description: string;
  specifications: string[];
  coverImage: string;
  price: number;
  merchantId: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
