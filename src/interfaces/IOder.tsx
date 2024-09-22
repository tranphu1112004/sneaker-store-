export interface IOder{
    id: string|number;
    userId: string|number;
    items:[
        {
            idProduct: string;
            quantity: number;
            price: number;
        }  
    ];
    totalPrice: number;
    status: string;
    createdAt: Date;
}