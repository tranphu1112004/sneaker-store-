import React, { createContext, useEffect, useState } from 'react';
import { Review } from '../interfaces/IProduct';
import { GetAllReviews, DeleteReview, AddReview, UpdateReview, GetIdReview } from '../service/Reviews';

type Props = {
    children: React.ReactNode;
};

interface IReviewContext {
    reviews: Review[];
    getReviewById: (id: string | number) => Promise<Review>;
    deleteReview: (id: string | number) => Promise<void>;
    addReview: (dataReview: Omit<Review, 'id'>) => Promise<void>;
    updateReview: (dataReview: Review) => Promise<void>;
}

export const ReviewCT = createContext<IReviewContext | undefined>(undefined);

const ReviewContext: React.FC<Props> = ({ children }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const reviewData = await GetAllReviews();
                setReviews(reviewData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách đánh giá:', error);
            }
        })();
    }, []);

    const getReviewById = async (id: string | number): Promise<Review> => {
        try {
            return await GetIdReview(id);
        } catch (error) {
            console.error('Lỗi khi lấy đánh giá theo ID:', error);
            throw error;
        }
    };

    const deleteReview = async (id: string | number) => {
        try {
            await DeleteReview(id);
            setReviews(reviews.filter(review => review.id !== id));
        } catch (error) {
            console.error('Lỗi khi xóa đánh giá:', error);
            throw error;
        }
    };

    const addReview = async (dataReview: Omit<Review, 'id'>) => {
        try {
            const newReview = await AddReview(dataReview);
            setReviews(prevReviews => [...prevReviews, newReview]);
        } catch (error) {
            console.error('Lỗi khi thêm đánh giá:', error);
            throw error;
        }
    };

    const updateReview = async (dataReview: Review) => {
        try {
            await UpdateReview(dataReview);
            setReviews(reviews.map(review => (review.id === dataReview.id ? dataReview : review)));
        } catch (error) {
            console.error('Lỗi khi cập nhật đánh giá:', error);
            throw error;
        }
    };

    return (
        <ReviewCT.Provider value={{ reviews, getReviewById, deleteReview, addReview, updateReview }}>
            {children}
        </ReviewCT.Provider>
    );
};

export default ReviewContext;
