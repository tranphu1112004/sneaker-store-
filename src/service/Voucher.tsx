import instance from "../config/axios";
import { FormVoucher, IVoucher } from "../interfaces/IOder";
import { GetUserById, UpdateUser } from "../service/User"; // Import các hàm cần thiết từ service User

export const GetAllVoucher = async (): Promise<IVoucher[]> => {
    try {
        const response = await instance.get(`/vouchers`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(`Có lỗi khi lấy ra danh sách Voucher:`, error);
        throw error;
    }
};

export const GetVoucherById = async (id: string): Promise<IVoucher> => {
    try {
        const response = await instance.get(`/vouchers/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy voucher ID ${id}:`, error);
        throw error;
    }
};

export const CreateVoucher = async (voucher: FormVoucher): Promise<IVoucher> => {
    try {
        const response = await instance.post(`/vouchers`, voucher);
        alert('Thêm Voucher thành công');
        return response.data;
    } catch (error) {
        console.error('Có lỗi khi thêm voucher:', error);
        throw error;
    }
};

export const UpdateVoucher = async (id: string, voucher: Partial<IVoucher>): Promise<IVoucher> => {
    try {
        const response = await instance.put(`/vouchers/${id}`, voucher);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật voucher ID ${id}:`, error);
        throw error;
    }
};

export const DeleteVoucher = async (id: string): Promise<void> => {
    try {
        await instance.delete(`/vouchers/${id}`);
    } catch (error) {
        console.error(`Lỗi khi xóa voucher ID ${id}:`, error);
        throw error;
    }
};

export const GiftVoucherToUser = async (userId: string | number, voucherId: string | number): Promise<void> => {
    try {
        const userResponse = await GetUserById(userId);

        // Kiểm tra và khởi tạo IdVoucher nếu nó không phải là một mảng
        const currentIdVouchers = Array.isArray(userResponse.IdVoucher) ? userResponse.IdVoucher : [];

        // Cập nhật IdVoucher
        const updatedIdVouchers = [...currentIdVouchers, voucherId];

        // Cập nhật lại thông tin người dùng với IdVoucher mới
        await UpdateUser(userId, { 
            ...userResponse,  // Thêm các trường hiện tại
            IdVoucher: updatedIdVouchers 
        });
        
        alert('Tặng voucher thành công');
    } catch (error) {
        console.error('Lỗi khi tặng voucher:', error);
        throw error;
    }
};


    


