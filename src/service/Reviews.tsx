import instance from '../config/axios';
import { formReview, Review } from '../interfaces/IProduct';

// Lấy tất cả các bình luận sản phẩm
export const GetAllReviews = async (): Promise<Review[]> => {
    try {
        const response = await instance.get(`/reviews`);
        console.log(response);
        return response.data;
    } catch (err) {
        console.log('Lỗi không tìm thấy bình luận nào: ' + err);
        throw err;
    }
};

// Lấy thông tin bình luận theo ID
export const GetIdReview = async (id: string | number): Promise<Review> => {
    try {
        const response = await instance.get(`/reviews/${id}`);
        console.log(`Thông tin bình luận ${id}:`, response);
        return response.data;
    } catch (err) {
        console.log('Lỗi không tìm thấy bình luận nào: ' + err);
        throw err;
    }
};

// Xoá một bình luận
export const DeleteReview = async (id: string | number): Promise<void> => {
    if (confirm(`Bạn có muốn xoá bình luận ${id} này không?`)) {
        try {
            await instance.delete(`/reviews/${id}`);
            console.log(`Đã xoá bình luận ${id}`);
        } catch (err) {
            console.log('Lỗi không thể xoá bình luận: ' + err);
            throw err;
        }
    }
};

// Cập nhật lại bình luận
export const UpdateReview = async (dataReview: Review): Promise<void> => {
    try {
        await instance.put(`/reviews/${dataReview.id}`, dataReview);
        console.log(`Đã cập nhật bình luận ${dataReview.id}`);
    } catch (err) {
        console.log('Lỗi khi cập nhật bình luận: ' + err);
        throw err;
    }
};

// Thêm bình luận
export const AddReview = async (dataReview: formReview): Promise<Review> => {
    try {
        const response = await instance.post(`/reviews`, dataReview);
        console.log('Đã thêm bình luận mới:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo bình luận mới:', error);
        throw error;
    }
};
