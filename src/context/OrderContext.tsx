import React, { createContext, useEffect, useState } from 'react';
import { IOrder } from '../interfaces/IOder';
import { GetAllOrders, CreateOrder, UpdateOrder, DeleteOrder } from '../service/Order';

type Props = {
    children: React.ReactNode;
};

// Định nghĩa kiểu dữ liệu cho context
interface IOrderContext {
    Orders: IOrder[];
    onAddOrder: (userId: string, items: { idProduct: string; quantity: number; price: number; }[], totalPrice: number, status: string,createdAt:Date) => Promise<void>;
    onUpdateOrder: (id: string | number, updatedOrder: Partial<IOrder>) => Promise<void>;
    onDeleteOrder: (id: string | number) => Promise<void>;
}

// Tạo context với giá trị mặc định
export const OrderCT = createContext<IOrderContext | undefined>(undefined);

const OrderContext: React.FC<Props> = ({ children }) => {
    const [Orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const OrderData = await GetAllOrders();
                setOrders(OrderData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách Order:', error);
            }
        })();
    }, []);

    const onAddOrder = async (userId: string, items: { idProduct: string; quantity: number; price: number; }[], totalPrice: number, status: string,createdAt:Date) => {
        try {
            const newOrder = await CreateOrder({ userId, items, totalPrice, status,createdAt});
            setOrders([...Orders, newOrder]);
            alert('Thêm Order thành công');
        } catch (error) {
            console.error('Lỗi khi thêm Order:', error);
            alert('Thêm Order thất bại');
        }
    };

    const onUpdateOrder = async (id: string | number, onUpdateOrder: Partial<IOrder>) => {
        try {
            const updatedOrder = await UpdateOrder(id, onUpdateOrder);
            setOrders(Orders.map(Order => Order.id === id ? updatedOrder : Order));
            alert('Cập nhật Order thành công');
        } catch (error) {
            console.error('Lỗi khi cập nhật Order:', error);
            alert('Cập nhật Order thất bại');
        }
    };

    const onDeleteOrder = async (id: string|number) => {
        try {
            await DeleteOrder(id);
            setOrders(Orders.filter(Order => Order.id !== id));
            alert('Xóa Order thành công');
        } catch (error) {
            console.error('Lỗi khi xóa Order:', error);
            alert('Xóa Order thất bại');
        }
    };

    return (
        <OrderCT.Provider value={{ Orders, onAddOrder, onUpdateOrder, onDeleteOrder }}>
            {children}
        </OrderCT.Provider>
    );
};

export default OrderContext;
