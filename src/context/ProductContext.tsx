import React, { createContext, useState, useEffect } from 'react';
import { FormType, IProduct } from '../interfaces/IProduct';
import { AddProduct, DeleteProduct, GetAllProducts, UpdateProduct } from '../service/Product';
import { useNavigate } from 'react-router-dom';

// Định nghĩa kiểu dữ liệu cho context
interface IProductContext {
    products: IProduct[];
    loading: boolean;
    error: string | null;
    onDelete: (id: string | number) => Promise<void>;
    onSubmitUpdate: (product: FormType, id: string | number) => Promise<void>;
    onAdd: (product: IProduct) => Promise<void>;
}

// Tạo context với giá trị mặc định
export const ProductCT = createContext<IProductContext | undefined>(undefined);

const ProductContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Lấy danh sách sản phẩm khi component được render
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productData = await GetAllProducts();
                setProducts(productData);
                setError(null); // Xóa lỗi nếu lấy sản phẩm thành công
                console.log(productData)
            } catch (error) {
                setError('Lỗi khi lấy danh sách sản phẩm');
                console.error('Lỗi khi lấy sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Xử lý xóa sản phẩm
    const onDelete = async (id: string | number) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (!confirmed) return; // Thoát nếu người dùng hủy việc xóa

        try {
            await DeleteProduct(id);
            setProducts(products.filter(product => product.id !== id));
            setError(null); // Xóa lỗi nếu xóa thành công
        } catch (error) {
            setError('Lỗi khi xóa sản phẩm');
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

   

    // Xử lý cập nhật sản phẩm
    const onSubmitUpdate = async (product: FormType, id: string | number) => {
        try {
            const updatedProduct = await UpdateProduct(id, product);
            setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
            setError(null); // Xóa lỗi nếu cập nhật thành công
            console.log(updatedProduct)
            alert('Cập nhật sản phẩm thành công');
            navigate('/admin/products');
        } catch (error) {
            setError('Lỗi khi cập nhật sản phẩm');
            console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
    };

    // Xử lý thêm sản phẩm mới
    const onAdd = async (product: IProduct) => {
        try {
            const newProduct = await AddProduct(product);
            setProducts([...products, newProduct]);
            setError(null); // Xóa lỗi nếu thêm thành công
            console.log(newProduct)
            alert('Thêm sản phẩm thành công');
            navigate('/admin/products');
        } catch (error) {
            setError('Lỗi khi thêm sản phẩm');
            console.error('Lỗi khi thêm sản phẩm:', error);
        }
    };

    return (
        <ProductCT.Provider value={{ products, loading, error, onDelete, onSubmitUpdate, onAdd }}>
            {children}
            {/* Hiển thị thông báo lỗi nếu có */}
            {error && <div className="text-red-500">{error}</div>}
        </ProductCT.Provider>
    );
};

export default ProductContext;
    