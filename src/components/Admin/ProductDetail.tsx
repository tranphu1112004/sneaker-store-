import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCT } from '../../context/ProductContext';
import { ColorCT } from '../../context/ColorContext';
import { SizeCT } from '../../context/SizeContext';
import { BrandCT } from '../../context/BrandContext';
import { IProduct } from '../../interfaces/IProduct';
import { CategoryCT } from '../../context/CategoryContex';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string | number }>();
    const { products } = useContext(ProductCT)!;
    const { colors } = useContext(ColorCT)!;
    const { sizes } = useContext(SizeCT)!;
    const { brands } = useContext(BrandCT)!;
    const { categories } = useContext(CategoryCT)!;

    const product = products.find((p: IProduct) => p.id === id || p.id === Number(id));
    if (!product) {
        return <p className="text-red-500">Sản phẩm không tồn tại</p>;
    }

    const getBrandName = (brandId: string | undefined) => {
        const brand = brands.find(b => b.id === brandId);
        return brand ? brand.name : 'Thương hiệu không xác định';
    };

    const getColorNames = () => {
        return product.colorIds.map(colorId => {
            const color = colors.find(c => c.id === colorId);
            return color ? color.name : 'Màu sắc không xác định';
        });
    };

    const getSizeNames = () => {
        return product.sizes.map(sizeId => {
            const size = sizes.find(s => s.id === sizeId);
            return size ? size.name : 'Kích cỡ không xác định';
        });
    };

    const category = categories.find(c => c.id === product.category)?.name || 'Unknown';

    return (
        <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>Chi tiết sản phẩm</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cột hình ảnh sản phẩm */}
                <div className="grid grid-cols-2 gap-4">
                    {product.imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform hover:scale-105" />
                    ))}
                </div>
                
                {/* Cột thông tin sản phẩm */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{product.name}</h3>
                    <p className="text-gray-700 text-lg">Mô tả: {product.description}</p>
                    
                    <div className="text-lg font-semibold">
                        <p className="text-gray-900">Giá: <span className="text-green-500">${product.price}</span></p>
                        {product.sale && (
                            <>
                                <p className="text-red-600 line-through">Giá gốc: <span className="text-gray-500">${product.price}</span></p>
                                <p className="text-red-500 font-bold">Giá Sale: <span className="text-lg">${product.pricenew}</span></p>
                            </>
                        )}
                    </div>
                    
                    <p className="text-lg font-semibold">Danh mục: <span className="text-blue-600">{category}</span></p>
                    <p className="text-lg font-semibold">Thương hiệu: {getBrandName(product.brandId)}</p>
                    <p className="text-lg font-semibold">Màu sắc: {getColorNames().join(', ')}</p>
                    <p className="text-lg font-semibold">Kích cỡ: {getSizeNames().join(', ')}</p>
                    <p className="text-lg font-semibold">Tồn kho: {product.stock}</p>
                </div>
            </div>

            {/* Đánh giá sản phẩm */}
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Đánh giá:</h3>
                {product.reviews.length > 0 ? (
                    product.reviews.map(review => (
                        <div key={review.id} className="border-b py-4">
                            <p className="font-semibold">{review.user.name} - <span className="text-yellow-500">{review.rating} sao</span></p>
                            <p className="text-gray-600">{review.comment}</p>
                            <p className="text-gray-500 text-sm">{review.createdAt}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Chưa có đánh giá nào.</p>
                )}
            </div>

            {/* Link quay lại */}
            <div className="mt-6">
                <Link to='/admin/products'>
                    <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
                        Trở về trang quản lý sản phẩm
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;
