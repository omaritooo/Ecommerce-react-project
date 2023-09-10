export interface product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
  liked: boolean;
}

export interface IUser {
  name: string;
  email: string;
  date: string;
  orderId: number;
}

export interface IReceipt {
  product: product[];
  user: IUser;
  totalCost?: number;
}
