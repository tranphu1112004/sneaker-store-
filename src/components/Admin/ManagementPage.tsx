import React, { useContext, useState } from 'react';
import { ColorCT } from '../../context/ColorContext';
import { CategoryCT } from '../../context/CategoryContex';
import { BrandCT } from '../../context/BrandContext';

const ITEMS_PER_PAGE = 6; // Số lượng mục hiển thị trên mỗi trang

const ManagementPage: React.FC = () => {
    const colorContext = useContext(ColorCT);
    const categoryContext = useContext(CategoryCT);
    const brandContext = useContext(BrandCT);

    if (!colorContext || !categoryContext || !brandContext) {
        return <div className="text-center">Loading...</div>;
    }

    const { colors, onAdd: addColor, onSubmitUpdate: updateColor, deleteColor } = colorContext;
    const { categories, onAdd: addCategory, onUpdateCategory: updateCategory, onDeleteCategory } = categoryContext;
    const { brands, onAdd: addBrand, onSubmitUpdate: updateBrand, deleteBrand } = brandContext;

    const [colorName, setColorName] = useState('');
    const [colorHex, setColorHex] = useState('');
    const [editingColorId, setEditingColorId] = useState<string | null>(null);

    const [categoryName, setCategoryName] = useState('');
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);

    const [brandName, setBrandName] = useState('');
    const [editingBrandId, setEditingBrandId] = useState<string | null>(null);

    const [colorPage, setColorPage] = useState(0);
    const [categoryPage, setCategoryPage] = useState(0);
    const [brandPage, setBrandPage] = useState(0);

    const handleColorSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingColorId) {
            await updateColor(editingColorId, colorName, colorHex);
            setEditingColorId(null);
        } else {
            await addColor(colorName, colorHex);
        }
        setColorName('');
        setColorHex('');
    };

    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategoryId) {
            await updateCategory(editingCategoryId, categoryName);
            setEditingCategoryId(null);
        } else {
            await addCategory(categoryName);
        }
        setCategoryName('');
    };

    const handleBrandSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBrandId) {
            await updateBrand(editingBrandId, brandName);
            setEditingBrandId(null);
        } else {
            await addBrand(brandName);
        }
        setBrandName('');
    };

    const handleEditColor = (color: { id: string; name: string; hex: string }) => {
        setEditingColorId(color.id);
        setColorName(color.name);
        setColorHex(color.hex);
    };

    const handleEditCategory = (category: { id: string; name: string }) => {
        setEditingCategoryId(category.id);
        setCategoryName(category.name);
    };

    const handleEditBrand = (brand: { id: string; name: string }) => {
        setEditingBrandId(brand.id);
        setBrandName(brand.name);
    };

    const colorStartIndex = colorPage * ITEMS_PER_PAGE;
    const categoryStartIndex = categoryPage * ITEMS_PER_PAGE;
    const brandStartIndex = brandPage * ITEMS_PER_PAGE;

    return (
        <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 ">Quản lý Màu Sắc</h2>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" onSubmit={handleColorSubmit}>
                <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder="Tên màu"
                    required
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    placeholder="Mã màu (HEX)"
                    required
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200">
                    {editingColorId ? 'Cập nhật' : 'Thêm'}
                </button>
            </form>
            <ul className="mb-8">
                {colors.slice(colorStartIndex, colorStartIndex + ITEMS_PER_PAGE).map(color => (
                    <li key={color.id} className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 transition duration-150">
                        <span>{color.name} ({color.hex})</span>
                        <div>
                            <button onClick={() => handleEditColor(color)} className="text-blue-500 mr-2 hover:underline">Sửa</button>
                            <button onClick={() => deleteColor(color.id)} className="text-red-500 hover:underline">Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mb-4">
                <button 
                    onClick={() => setColorPage(prev => Math.max(prev - 1, 0))} 
                    disabled={colorPage === 0}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                >
                    Trang trước
                </button>
                <button 
                    onClick={() => setColorPage(prev => Math.min(prev + 1, Math.ceil(colors.length / ITEMS_PER_PAGE) - 1))} 
                    disabled={(colorPage + 1) * ITEMS_PER_PAGE >= colors.length}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                >
                    Trang sau
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Quản lý Danh Mục</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleCategorySubmit}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Tên danh mục"
                    required
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200">
                    {editingCategoryId ? 'Cập nhật' : 'Thêm'}
                </button>
            </form>
            <ul className="mb-8">
                {categories.slice(categoryStartIndex, categoryStartIndex + ITEMS_PER_PAGE).map(category => (
                    <li key={category.id} className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 transition duration-150">
                        <span>{category.name}</span>
                        <div>
                            <button onClick={() => handleEditCategory(category)} className="text-blue-500 mr-2 hover:underline">Sửa</button>
                            <button onClick={() => onDeleteCategory(category.id)} className="text-red-500 hover:underline">Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mb-4">
                <button 
                    onClick={() => setCategoryPage(prev => Math.max(prev - 1, 0))} 
                    disabled={categoryPage === 0}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                >
                    Trang trước
                </button>
                <button 
                    onClick={() => setCategoryPage(prev => Math.min(prev + 1, Math.ceil(categories.length / ITEMS_PER_PAGE) - 1))} 
                    disabled={(categoryPage + 1) * ITEMS_PER_PAGE >= categories.length}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                >
                    Trang sau
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4 ">Quản lý Hãng</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleBrandSubmit}>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Tên hãng"
                    required
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200">
                    {editingBrandId ? 'Cập nhật' : 'Thêm'}
                </button>
            </form>
            <ul>
                {brands.slice(brandStartIndex, brandStartIndex + ITEMS_PER_PAGE).map(brand => (
                    <li key={brand.id} className="flex justify-between items-center border-b py-2 px-4 hover:bg-gray-100 transition duration-150">
                        <span>{brand.name}</span>
                        <div>
                            <button onClick={() => handleEditBrand(brand)} className="text-blue-500 mr-2 hover:underline">Sửa</button>
                            <button onClick={() => deleteBrand(brand.id)} className="text-red-500 hover:underline">Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mb-4">
                <button 
                    onClick={() => setBrandPage(prev => Math.max(prev - 1, 0))} 
                    disabled={brandPage === 0}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                >
                    Trang trước
                </button>
                <button 
                    onClick={() => setBrandPage(prev => Math.min(prev + 1, Math.ceil(brands.length / ITEMS_PER_PAGE) - 1))} 
                    disabled={(brandPage + 1) * ITEMS_PER_PAGE >= brands.length}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default ManagementPage;
