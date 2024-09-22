// BrandContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import { IBrand } from '../interfaces/IProduct';
import { CreateBrand, DeleteBrand, GetAllBrands, UpdateBrand } from '../service/Brand';

// Define the type for BrandContext
interface IBrandContext {
    brands: IBrand[];
    deleteBrand: (id: string) => Promise<void>;
    onSubmitUpdate: (id: string, name: string) => Promise<void>;
    onAdd: (name: string) => Promise<void>;
}

type Props = {
    children: React.ReactNode;
};

// Initialize the context with the proper type
export const BrandCT = createContext<IBrandContext | undefined>(undefined);

const BrandContext: React.FC<Props> = ({ children }) => {
    const [brands, setBrands] = useState<IBrand[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const brandData = await GetAllBrands();
                setBrands(brandData);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        })();
    }, []);

    const deleteBrand = async (id: string) => {
        try {
            await DeleteBrand(id);
            const updatedBrands = brands.filter(brand => brand.id !== id);
            setBrands(updatedBrands);
            alert('Brand deleted successfully');
        } catch (error) {
            console.error('Failed to delete brand:', error);
            alert('Failed to delete brand');
        }
    };

    const onSubmitUpdate = async (id: string, name: string) => {
        try {
            await UpdateBrand(id, name);
            const updatedBrands = brands.map(brand =>
                brand.id === id ? { ...brand, name } : brand
            );
            setBrands(updatedBrands);
            alert('Brand updated successfully');
        } catch (error) {
            console.error('Failed to update brand:', error);
            alert('Failed to update brand');
        }
    };

    const onAdd = async (name: string) => {
        try {
            const brandData = await CreateBrand(name);
            setBrands([...brands, brandData]);
            alert('Brand added successfully');
        } catch (error) {
            console.error('Failed to add brand:', error);
            alert('Failed to add brand');
        }
    };

    return (
        <BrandCT.Provider value={{ brands, deleteBrand, onSubmitUpdate, onAdd }}>
            {children}
        </BrandCT.Provider>
    );
};

export default BrandContext;
