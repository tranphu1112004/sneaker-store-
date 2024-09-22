import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductCT } from '../../context/ProductContext';
import { ColorCT } from '../../context/ColorContext';
import { SizeCT } from '../../context/SizeContext';
import { BrandCT } from '../../context/BrandContext';
import { CategoryCT } from '../../context/CategoryContex';
import { FormType } from '../../interfaces/IProduct';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products, onSubmitUpdate } = useContext(ProductCT)!;
    const { colors } = useContext(ColorCT)!;
    const { sizes } = useContext(SizeCT)!;
    const { brands } = useContext(BrandCT)!;
    const { categories } = useContext(CategoryCT)!;
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormType | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const product = products.find(p => p.id === id);
        if (product) {
            setFormData(product);
            setImageUrls(product.imageUrls); // Set initial image URLs from the product
        } else {
            navigate('/admin/products');
        }
    }, [id, products, navigate]);

    if (!formData) return <p>Loading...</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev!,
            [name]: value,
        }));
        setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setImageUrls(prev => [...prev, e.target.value]);
            e.target.value = ''; // Clear input after adding
        }
    };

    const handleColorSelect = (colorId: string) => {
        setFormData(prev => ({
            ...prev!,
            colorIds: prev!.colorIds.includes(colorId)
                ? prev!.colorIds.filter(id => id !== colorId)
                : [...prev!.colorIds, colorId],
        }));
    };

    const handleSizeSelect = (sizeId: string) => {
        setFormData(prev => ({
            ...prev!,
            sizes: prev!.sizes.includes(sizeId)
                ? prev!.sizes.filter(s => s !== sizeId)
                : [...prev!.sizes, sizeId],
        }));
    };

    const handleSaleToggle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev!, sale: e.target.value === 'true' }));
    };

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData!.name) errors.name = 'Tên sản phẩm không được để trống';
        if (!formData!.price || formData!.price <= 0) errors.price = 'Giá sản phẩm phải lớn hơn 0';
        if (formData!.sale && (!formData!.pricenew || formData!.pricenew <= 0)) 
            errors.pricenew = 'Giá sản phẩm khi sale phải lớn hơn 0';
        if (!formData!.category) errors.category = 'Danh mục không được để trống';
        if (!formData!.brandId) errors.brandId = 'Thương hiệu không được để trống';
        if (formData!.sizes.length === 0) errors.sizes = 'Bạn chưa chọn kích cỡ cho sản phẩm';
        if (formData!.colorIds.length === 0) errors.colorIds = 'Bạn chưa chọn màu cho sản phẩm';
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const updatedProduct = { ...formData!, imageUrls };

        if (id) {
            await onSubmitUpdate(updatedProduct, id);
            navigate('/admin/products'); // Redirect after updating
        }
    };

    const handleDeleteImage = (url: string) => {
        setImageUrls(prev => prev.filter(image => image !== url));
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-6 p-6 bg-white rounded-md shadow-md max-w-full mx-auto">
            <h2 className="text-2xl font-bold mb-6">Sửa sản phẩm</h2>
            <div className="grid gap-4">
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
                    placeholder="Giá"
                    className={`p-3 border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                />
                {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}

                {/* Sale Price */}
                <label className="text-sm font-semibold">Giá khi sale</label>
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
                <select name="sale" value={formData.sale ? 'true' : 'false'} onChange={handleSaleToggle} className="p-3 border border-gray-300 rounded-lg">
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
                                <span className="text-white text-lg">&#10003;</span>
                            )}
                        </div>
                    ))}
                </div>
                {formErrors.colorIds && <p className="text-red-500 text-sm">{formErrors.colorIds}</p>}

                {/* Sizes */}
                <label className="text-sm font-semibold">Kích cỡ</label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map(size => (
                        <button
                            key={size.id}
                            type="button"
                            onClick={() => handleSizeSelect(size.id)}
                            className={`px-3 py-1 border rounded-lg ${
                                formData.sizes.includes(size.id) ? 'bg-green-200 border-green-400' : 'border-gray-300'
                            }`}
                        >
                            {size.name}
                        </button>
                    ))}
                </div>
                {formErrors.sizes && <p className="text-red-500 text-sm">{formErrors.sizes}</p>}

                {/* Image URLs */}
                <label className="text-sm font-semibold">Link hình ảnh</label>
                <input
                    type="text"
                    onChange={handleImageChange}
                    placeholder="Nhập link hình ảnh"
                    className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {imageUrls.map((url, idx) => (
                        <div key={idx} className="relative w-full h-32 bg-gray-200 rounded-lg">
                            <img
                                src={url}
                                alt={`Existing ${idx}`}
                                className="object-cover w-full h-full rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(url)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                &#10005;
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Cập nhật sản phẩm
                </button>
            </div>
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

export default EditProduct;
