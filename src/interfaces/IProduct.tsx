export interface IProduct {
    id: string | number ;
    name: string;
    brandId?: string;
    price: number;
    pricenew: number;
    sizes: string[]; // Mảng chứa ID kích cỡ
    colorIds: string[]; // Mảng chứa ID màu
    stock: number;
    description: string;
    imageUrls: string[]; // Mảng chứa URL hình ảnh
    category: string;
    dateAdded: string;
    reviews: Review[];
    sale: boolean;
    quantity: number;
    isActive: boolean;
    idVochond: string;
}

export interface Review {
    id: string | number;
    rating: number;
    comment: string;
    createdAt: string;
    user: User;
}
export type formReview = Pick<Review ,'rating'|'comment'|'createdAt'>

export interface User {
    id: string | number;
    name: string;
    email: string;
}

export interface IColor {
    id: string;
    name: string;
    hex: string; // Mã màu HEX
}

export interface ISize {
    id: string;
    name: string; // Tên kích cỡ (S, M, L, XL)
}

export interface IBrand {
    id: string;
    name: string;
}
export interface ICategory {
    id: string;
    name: string;
}


export type FormType = Pick<
  IProduct,
  |'id'
  | 'name'
  | 'dateAdded'
  | 'brandId'
  | 'colorIds'
  | 'description'
  | 'category'
  | 'imageUrls'
  | 'price'
  | 'sizes'
  | 'stock'
  | 'sale'
  | 'quantity'
  | 'pricenew'
  | 'reviews'
  |'isActive'
>;