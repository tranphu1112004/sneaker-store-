import { ISize } from '../interfaces/IProduct'; // Import interface ISize
import instance from "../config/axios";

export const GetAllSizes = async (): Promise<ISize[]> => {
    try {
        const response = await instance.get(`/sizes`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách kích cỡ:', error);
        throw error;
    }
};

export const CreateSize = async (name: string): Promise<ISize> => {
    try {
        const response = await instance.post(`/sizes`, { name });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo kích cỡ mới:', error);
        throw error;
    }
};

export const UpdateSize = async (id: string, name: string): Promise<ISize> => {
    try {
        const response = await instance.put(`/sizes/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật kích cỡ ID ${id}:`, error);
        throw error;
    }
};

export const DeleteSize = async (id: string): Promise<void> => {
    try {
        await instance.delete(`/sizes/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xóa kích cỡ ID ${id}:`, error);
        throw error;
    }
};
