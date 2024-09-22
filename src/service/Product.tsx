import instance from "../config/axios";
import { FormType } from "../interfaces/IProduct";

// Lấy tất cả sản phẩm
export const GetAllProducts = async () => {
    try {
        const { data } = await instance.get('products');
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Lấy sản phẩm theo ID
export const GetProductById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`products/${id}`);
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Thêm sản phẩm mới
export const AddProduct = async (Dataform: FormType) => {
    try {
        const { data } = await instance.post('products', Dataform);
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Cập nhật sản phẩm
export const UpdateProduct = async (id:string | number, Dataform: FormType) => {
    try {
        const { data } = await instance.put(`products/${id}`, Dataform);
        return data;
    } catch (e) {
        console.log(e);
    }
};

// Xóa sản phẩm
export const DeleteProduct = async (id: string | number) => {
    try {
        await instance.delete(`products/${id}`);
    } catch (e) {
        console.log(e);
    }
};
