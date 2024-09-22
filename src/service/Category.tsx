import { ICategory } from '../interfaces/IProduct'; // Import interface ICategory
import instance from "../config/axios";

// Lấy tất cả các category
export const GetAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await instance.get(`/categories`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
        throw error;
    }
};

// Tạo mới một category
export const CreateCategory = async (name: string): Promise<ICategory> => {
    try {
        const response = await instance.post(`/categories`, { name });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo danh mục mới:', error);
        throw error;
    }
};

// Cập nhật một category
export const UpdateCategory = async (id: string, name: string): Promise<ICategory> => {
    try {
        const response = await instance.put(`/categories/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật danh mục ID ${id}:`, error);
        throw error;
    }
};

// Xóa một category
export const DeleteCategory = async (id: string): Promise<void> => {
    try {
        await instance.delete(`/categories/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xóa danh mục ID ${id}:`, error);
        throw error;
    }
};
