export interface IOrder {
    id: string | number;
    userId: string | number;
    items: {
        idProduct: string;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    status: string;
    createdAt: Date;
}


export interface IVoucher {
    id: string;
    code: string;
    discountPercentage: number;
    minimumSpend: number; 
    expiryDate: string; 
    isActive: boolean;
}

export type FormVoucher = Pick<IVoucher, 'code'|'discountPercentage'|'expiryDate'|'isActive'|'minimumSpend'>
export type FormOrder = Pick<IOrder, 'userId'|'items'|'totalPrice'|'status'|'createdAt'>