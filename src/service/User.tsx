import instance from "../config/axios";
import { IUser } from "../interfaces/IUser";

// Get all users
export const GetAllUsers = async (): Promise<IUser[]> => {
    try {
        const data = await instance.get(`/users`);
        return data.data;
    } catch (error) {
        console.error(`Có lỗi khi lấy ra danh sách người dùng:`, error);
        throw error;
    }
};

// Get user by ID
export const GetUserById = async (id: string | number): Promise<IUser> => {
    try {
        const response = await instance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy thông tin người dùng ID ${id}:`, error);
        throw error;
    }
};

// Create a new user
export const CreateUser = async (user: Omit<IUser, 'id'>): Promise<IUser> => {
    try {
        const response = await instance.post(`/users`, user);
        alert('Thêm người dùng thành công');
        return response.data;
    } catch (error) {
        console.error('Có lỗi khi thêm người dùng:', error);
        throw error;
    }
};

// Update a user
export const UpdateUser = async (id: string | number, user: Partial<IUser>): Promise<IUser> => {
    try {
        const response = await instance.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật người dùng ID ${id}:`, error);
        throw error;
    }
};

// Delete a user
export const DeleteUser = async (id: string | number): Promise<void> => {
    try {
        await instance.delete(`/users/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xóa người dùng ID ${id}:`, error);
        throw error;
    }
};
