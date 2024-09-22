import { IBrand } from '../interfaces/IProduct';
import instance from "../config/axios"; 

// Fetch all brands
export const GetAllBrands = async (): Promise<IBrand[]> => {
    try {
        const response = await instance.get('/brands');
        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw error;
    }
};

// Create a new brand
export const CreateBrand = async (name: string): Promise<IBrand> => {
    try {
        const response = await instance.post('/brands', { name });
        return response.data;
    } catch (error) {
        console.error('Error creating brand:', error);
        throw error;
    }
};

// Update an existing brand
export const UpdateBrand = async (id: string, name: string): Promise<IBrand> => {
    try {
        const response = await instance.put(`/brands/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error(`Lỗi id: ${id}:`, error);
        throw error;
    }
};

// Delete a brand
export const DeleteBrand = async (id: string): Promise<void> => {
    try {
        await instance.delete(`/brands/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xoá id: ${id}:`, error);
        throw error;
    }
};
