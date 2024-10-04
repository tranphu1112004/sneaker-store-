import { FormOrder, IOrder } from '../interfaces/IOder';
import instance from "../config/axios";

// Lấy tất cả đơn hàng
export const GetAllOrders = async (): Promise<IOrder[]> => {
    try {
        const response = await instance.get(`/orders`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        throw error;
    }
};

// Lấy một đơn hàng theo ID
export const GetOrderById = async (id: string | number): Promise<IOrder> => {
    try {
        const response = await instance.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy đơn hàng ID ${id}:`, error);
        throw error;
    }
};

// Tạo đơn hàng mới
export const CreateOrder = async (DataOrder:FormOrder): Promise<IOrder> => {
    try {
        const response = await instance.post(`/orders`, DataOrder);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng mới:', error);
        throw error;
    }
};

// Cập nhật đơn hàng theo ID
export const UpdateOrder = async (id: string | number, order: Partial<IOrder>): Promise<IOrder> => {
    try {
        const response = await instance.put(`/orders/${id}`, order);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật đơn hàng ID ${id}:`, error);
        throw error;
    }
};

// Xóa đơn hàng theo ID
export const DeleteOrder = async (id: string | number): Promise<void> => {
    try {
        await instance.delete(`/orders/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xóa đơn hàng ID ${id}:`, error);
        throw error;
    }
};
