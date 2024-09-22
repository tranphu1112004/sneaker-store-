    import React, { createContext, useEffect, useState } from 'react';
    import { IColor } from '../interfaces/IProduct';
    import { CreateColor, DeleteColor, GetAllColor, UpdateColor } from '../service/Color';

    type Props = {
        children: React.ReactNode;
    };

    // Define the context type
    interface IColorContext {
        colors: IColor[];
        deleteColor: (id: string) => Promise<void>;
        onSubmitUpdate: (id: string, name: string, hex: string) => Promise<void>;
        onAdd: (name: string, hex: string) => Promise<void>;
    }

    // Create the context with the default value
    export const ColorCT = createContext<IColorContext | undefined>(undefined);

    const ColorContext: React.FC<Props> = ({ children }) => {
        const [colors, setColors] = useState<IColor[]>([]);

        useEffect(() => {
            (async () => {
                try {
                    const colorData = await GetAllColor();
                    setColors(colorData);
                } catch (error) {
                    console.error('Error fetching colors:', error);
                }
            })();
        }, []);

        const deleteColor = async (id: string) => {
            try {
                await DeleteColor(id);
                setColors(colors.filter(color => color.id !== id));
            } catch (error) {
                console.error('Error deleting color:', error);
            }
        };

        const onSubmitUpdate = async (id: string, name: string, hex: string) => {
            try {
                const updatedColor = await UpdateColor(id, name, hex);
                setColors(colors.map(color => color.id === id ? updatedColor : color));
            } catch (error) {
                console.error('Error updating color:', error);
            }
        };

        const onAdd = async (name: string, hex: string) => {
            try {
                const newColor = await CreateColor(name, hex);
                setColors([...colors, newColor]);
                alert('Color added successfully');
            } catch (error) {
                console.error('Error adding color:', error);
                alert('Failed to add color');
            }
        };

        return (
            <ColorCT.Provider value={{ colors, deleteColor, onSubmitUpdate, onAdd }}>
                {children}
            </ColorCT.Provider>
        );
    };

    export default ColorContext;
