import React, { createContext, useEffect, useState } from 'react';
import { ISize } from '../interfaces/IProduct';
import { GetAllSizes, CreateSize, UpdateSize, DeleteSize } from '../service/Size';

type Props = {
    children: React.ReactNode;
};

// Define the context type
interface ISizeContext {
    sizes: ISize[];
    onAddSize: (name: string) => Promise<void>;
    onUpdateSize: (id: string, name: string) => Promise<void>;
    onDeleteSize: (id: string) => Promise<void>;
}

// Create the context with the default value
export const SizeCT = createContext<ISizeContext | undefined>(undefined);

const SizeContext: React.FC<Props> = ({ children }) => {
    const [sizes, setSizes] = useState<ISize[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const sizeData = await GetAllSizes();
                setSizes(sizeData);
            } catch (error) {
                console.error('Error fetching sizes:', error);
            }
        })();
    }, []);

    const onAddSize = async (name: string) => {
        try {
            const newSize = await CreateSize(name);
            setSizes([...sizes, newSize]);
            alert('Size added successfully');
        } catch (error) {
            console.error('Error adding size:', error);
            alert('Failed to add size');
        }
    };

    const onUpdateSize = async (id: string, name: string) => {
        try {
            const updatedSize = await UpdateSize(id, name);
            setSizes(sizes.map(size => size.id === id ? updatedSize : size));
            alert('Size updated successfully');
        } catch (error) {
            console.error('Error updating size:', error);
            alert('Failed to update size');
        }
    };

    const onDeleteSize = async (id: string) => {
        try {
            await DeleteSize(id);
            setSizes(sizes.filter(size => size.id !== id));
            alert('Size deleted successfully');
        } catch (error) {
            console.error('Error deleting size:', error);
            alert('Failed to delete size');
        }
    };

    return (
        <SizeCT.Provider value={{ sizes, onAddSize, onUpdateSize, onDeleteSize }}>
            {children}
        </SizeCT.Provider>
    );
};

export default SizeContext;
