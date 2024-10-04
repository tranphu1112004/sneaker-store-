import React, { useContext, useState } from 'react';
import { ProductCT } from '../../context/ProductContext';
import { ColorCT } from '../../context/ColorContext';
import { SizeCT } from '../../context/SizeContext';
import { BrandCT } from '../../context/BrandContext';
import { CategoryCT } from '../../context/CategoryContext';
import { FormType } from '../../interfaces/IProduct';
import { Link } from 'react-router-dom';

const AddProduct: React.FC = () => {
    const { onAdd } = useContext(ProductCT)!;
    const { colors } = useContext(ColorCT)!;
    const { sizes } = useContext(SizeCT)!;
    const { brands } = useContext(BrandCT)!;
    const { categories } = useContext(CategoryCT)!;

    const [formData, setFormData] = useState<FormType>({
        name: '',
        price: 0,
        pricenew: 0,
        colorIds: [],
        sizes: [],
        imageUrls: [],
        description: '',
        category: '',
        dateAdded: new Date().toISOString(),
        stock: 0,
        sale: false,
        quantity: 0,
        brandId: '',
        reviews: [],
        id: '',
        isActive: true
    });

    const [imageUrl, setImageUrl] = useState('');
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: '', // Clear errors on input change
        }));
    };

    // Handle color selection
    const handleColorSelect = (colorId: string) => {
        setFormData(prev => ({
            ...prev,
            colorIds: prev.colorIds.includes(colorId)
                ? prev.colorIds.filter(id => id !== colorId)
                : [...prev.colorIds, colorId],
        }));
    };

    // Handle size selection
    const handleSizeSelect = (sizeId: string) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(sizeId)
                ? prev.sizes.filter(s => s !== sizeId)
                : [...prev.sizes, sizeId],
        }));
    };

    // Validate the form
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.id) errors.id = 'Mã sản phẩm không được để trống';
        if (!formData.name) errors.name = 'Tên sản phẩm không được để trống';
        if (!formData.price || formData.price <= 0) errors.price = 'Giá sản phẩm phải lớn hơn 0';
        if (formData.sale && (!formData.pricenew || formData.pricenew <= 0)) 
            errors.pricenew = 'Giá sản phẩm khi sale phải lớn hơn 0';
        if (!formData.category) errors.category = 'Danh mục không được để trống';
        if (!formData.brandId) errors.brandId = 'Thương hiệu không được để trống';
        if (formData.sizes.length === 0) errors.sizes = 'Bạn chưa chọn kích thước cho sản phẩm';
        if (formData.colorIds.length === 0) errors.colorIds = 'Bạn chưa chọn màu cho sản phẩm';
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const newProduct = { ...formData, imageUrls: [...formData.imageUrls, imageUrl] };

        // Call the onAdd function
        await onAdd(newProduct);
        // Reset form after submission
        setFormData({
            name: '',
            price: 0,
            pricenew: 0,
            colorIds: [],
            sizes: [],
            imageUrls: [],
            description: '',
            category: '',
            dateAdded: new Date().toISOString(),
            stock: 0,
            sale: false,
            quantity: 0,
            brandId: '',
            reviews: [],
            id: '',
            isActive: true
        });
        setImageUrl('');
    };

    const addImageUrl = () => {
        if (imageUrl) {
            setFormData(prev => ({
                ...prev,
                imageUrls: [...prev.imageUrls, imageUrl],
            }));
            setImageUrl('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 p-6 bg-white rounded-md shadow-md max-w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h2>
            <div className="grid gap-4">
                {/* Product ID */}
                <label className="text-sm font-semibold">Mã sản phẩm</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder="Nhập mã của sản phẩm"
                    className="p-3 border border-gray-300 rounded-lg"
                />

                {/* Product Name */}
                <label className="text-sm font-semibold">Tên sản phẩm</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên của sản phẩm"
                    className={`p-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

                {/* Description */}
                <label className="text-sm font-semibold">Mô tả sản phẩm</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Mô tả của sản phẩm"
                    className="p-3 border border-gray-300 rounded-lg"
                />

                {/* Price */}
                <label className="text-sm font-semibold">Giá sản phẩm</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Giá sản phẩm"
                    className={`p-3 border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                />
                {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}

                {/* Sale Price */}
                <label className="text-sm font-semibold">Giá sản phẩm khi sale</label>
                <input
                    type="number"
                    name="pricenew"
                    value={formData.pricenew}
                    onChange={handleChange}
                    placeholder="Giá sale"
                    className={`p-3 border ${formErrors.pricenew ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                />
                {formErrors.pricenew && <p className="text-red-500 text-sm">{formErrors.pricenew}</p>}

                {/* Sale Toggle */}
                <label className="text-sm font-semibold">Có giảm giá?</label>
                <select
                    name="sale"
                    value={formData.sale ? 'true' : 'false'}
                    onChange={(e) => setFormData(prev => ({ ...prev, sale: e.target.value === 'true' }))}
                    className="p-3 border border-gray-300 rounded-lg"
                >
                    <option value="false">Không</option>
                    <option value="true">Có</option>
                </select>

                {/* Brand */}
                <label className="text-sm font-semibold">Thương hiệu</label>
                <select
                    name="brandId"
                    value={formData.brandId}
                    onChange={handleChange}
                    className={`p-3 border ${formErrors.brandId ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                >
                    <option value="">Chọn thương hiệu</option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                {formErrors.brandId && <p className="text-red-500 text-sm">{formErrors.brandId}</p>}

                {/* Category */}
                <label className="text-sm font-semibold">Danh mục</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`p-3 border ${formErrors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {formErrors.category && <p className="text-red-500 text-sm">{formErrors.category}</p>}

                {/* Colors */}
                <label className="text-sm font-semibold">Màu sắc</label>
                <div className="grid grid-cols-10 gap-2">
                    {colors.map(color => (
                        <div
                            key={color.id}
                            onClick={() => handleColorSelect(color.id)}
                            className={`relative cursor-pointer w-10 h-10 rounded-full border shadow flex items-center justify-center ${formData.colorIds.includes(color.id) ? 'border-green-500' : 'border-gray-300'}`}
                            style={{ backgroundColor: color.hex }}
                        >
                            {formData.colorIds.includes(color.id) && (
                                <span className="text-white text-lg font-bold">✓</span>
                            )}
                        </div>
                    ))}
                </div>
                {formErrors.colorIds && <p className="text-red-500 text-sm">{formErrors.colorIds}</p>}

                {/* Sizes */}
                <label className="text-sm font-semibold">Kích thước</label>
                <div className="grid grid-cols-6 gap-2">
    {sizes.map(size => (
        <button
            key={size.id}
            type="button"
            onClick={() => handleSizeSelect(size.id)} // Use size.id instead of size.name
            className={`p-2 border rounded-lg ${formData.sizes.includes(size.id) ? 'bg-green-500 text-white' : 'border-gray-300'}`}
        >
            {size.name}
        </button>
    ))}
</div>
{formErrors.sizes && <p className="text-red-500 text-sm">{formErrors.sizes}</p>}
                    
                {/* Stock */}
                <label className="text-sm font-semibold">Số lượng trong kho</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Số lượng trong kho"
                    className="p-3 border border-gray-300 rounded-lg"
                />

                {/* Image URL */}
                <label className="text-sm font-semibold">Nhập URL ảnh sản phẩm</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Nhập URL của ảnh"
                    className="p-3 border border-gray-300 rounded-lg"
                />
                <button type="button" onClick={addImageUrl} className="p-2 bg-blue-500 text-white rounded-lg">
                    Thêm ảnh
                </button>

                {/* Display added image URLs */}
                <div>
                    <h3 className="text-sm font-semibold">Ảnh đã thêm:</h3>
                    <ul>
                        {formData.imageUrls.map((url, index) => (
                            <li key={index} className="text-sm">{url}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <button type="submit" className="p-3 bg-blue-500 text-white rounded-lg">
                Thêm sản phẩm
            </button>
            <div className="mt-6">
                <Link to='/admin/products'>
                    <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600">
                        Trở về trang quản lý sản phẩm
                    </div>
                </Link>
            </div>
        </form>
    );
};

export default AddProduct;
