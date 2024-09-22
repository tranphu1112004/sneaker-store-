import React, { useContext, useState } from 'react';
import { IProduct } from '../../interfaces/IProduct';
import { ProductCT } from '../../context/ProductContext';
import { ColorCT } from '../../context/ColorContext';
import { SizeCT } from '../../context/SizeContext';
import { BrandCT } from '../../context/BrandContext';
import { CategoryCT } from '../../context/CategoryContex';
import { Link } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 5; // 5 sản phẩm mỗi trang

const StoppedProducts: React.FC = () => {
    const productContext = useContext(ProductCT);
    const colorContext = useContext(ColorCT);
    const sizeContext = useContext(SizeCT);
    const brandContext = useContext(BrandCT);
    const categoryContext = useContext(CategoryCT);

    if (!productContext || !colorContext || !sizeContext || !brandContext || !categoryContext) {
        return <div className="text-center py-10">Loading...</div>;
    }

    const { products, onSubmitUpdate } = productContext;
    const { brands } = brandContext;
    const { categories } = categoryContext;

    const [currentPage, setCurrentPage] = useState<number>(1);

    const stoppedProducts = products.filter(product => !product.isActive);
    const totalPages = Math.ceil(stoppedProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = stoppedProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    const toggleProductStatus = (product: IProduct) => {
        onSubmitUpdate(
            {
                ...product,
                isActive: !product.isActive
            },
            product.id
        );
    };

    return (
        <div className="px-4 space-y-2">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sản phẩm đã dừng bán</h2>
            {paginatedProducts.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thương hiệu</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá Sale</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedProducts.map(product => {
                            const brand = brands.find(b => b.id === product.brandId)?.name || 'Unknown';
                            const category = categories.find(c => c.id === product.category)?.name || 'Unknown';

                            return (
                                <tr key={product.id}>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.id}</td>
                                    <Link to={`/admin/product/${product.id}`}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                                    </Link>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.imageUrls && product.imageUrls.length > 0 ? (
                                            <img src={product.imageUrls[0]} alt={product.name} className="w-10 h-10 object-cover rounded" />
                                        ) : (
                                            <p className="text-gray-500">Không có ảnh</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500">{brand}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500">{category}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500">${product.price}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500">${product.pricenew}</td>
                                    <td className="px-4 py-4 text-sm font-medium flex items-center justify-center space-x-2">
                                        <Link to={`/admin/product/edit/${product.id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                                                Sửa
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => toggleProductStatus(product)}
                                            className="bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-900"
                                        >
                                            Bán lại
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="flex justify-center items-center h-40">
                    <p className="text-gray-600">Không có sản phẩm dừng bán</p>
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow disabled:opacity-50"
                >
                    Trước
                </button>
                <span className="text-gray-700">Trang {currentPage} của {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded shadow disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default StoppedProducts;
