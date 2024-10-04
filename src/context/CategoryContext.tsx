// import React, { createContext, useEffect, useState } from 'react';
// import { ICategory } from '../interfaces/IProduct';
// import { GetAllCategories, CreateCategory, UpdateCategory, DeleteCategory } from '../service/Category';

// type Props = {
//     children: React.ReactNode;
// };

// // Define the context type
// interface ICategoryContext {
//     categories: ICategory[];
//     onAddCategory: (name: string) => Promise<void>;
//     onUpdateCategory: (id: string, name: string) => Promise<void>;
//     onDeleteCategory: (id: string) => Promise<void>;
// }

// // Create the context with the default value
// export const CategoryCT = createContext<ICategoryContext | undefined>(undefined);

// const CategoryContext: React.FC<Props> = ({ children }) => {
//     const [categories, setCategories] = useState<ICategory[]>([]);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const categoryData = await GetAllCategories();
//                 setCategories(categoryData);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         })();
//     }, []);

//     const onAddCategory = async (name: string) => {
//         try {
//             const newCategory = await CreateCategory(name);
//             setCategories([...categories, newCategory]);
//             alert('Category added successfully');
//         } catch (error) {
//             console.error('Error adding category:', error);
//             alert('Failed to add category');
//         }
//     };

//     const onUpdateCategory = async (id: string, name: string) => {
//         try {
//             const updatedCategory = await UpdateCategory(id, name);
//             setCategories(categories.map(category => category.id === id ? updatedCategory : category));
//             alert('Category updated successfully');
//         } catch (error) {
//             console.error('Error updating category:', error);
//             alert('Failed to update category');
//         }
//     };

//     const onDeleteCategory = async (id: string) => {
//         try {
//             await DeleteCategory(id);
//             setCategories(categories.filter(category => category.id !== id));
//             alert('Category deleted successfully');
//         } catch (error) {
//             console.error('Error deleting category:', error);
//             alert('Failed to delete category');
//         }
//     };

//     return (
//         <CategoryCT.Provider value={{ categories, onAddCategory, onUpdateCategory, onDeleteCategory }}>
//             {children}
//         </CategoryCT.Provider>
//     );
// };

// export default CategoryContext;
import React, { createContext, useEffect, useState } from 'react';
import { ICategory } from '../interfaces/IProduct';
import { GetAllCategories, CreateCategory, UpdateCategory, DeleteCategory } from '../service/Category';

type Props = {
    children: React.ReactNode;
};

// Define the context type
interface ICategoryContext {
    categories: ICategory[];
    onAddCategory: (name: string) => Promise<void>;
    onUpdateCategory: (id: string, name: string) => Promise<void>;
    onDeleteCategory: (id: string) => Promise<void>;
}

// Create the context with the default value
export const CategoryCT = createContext<ICategoryContext | undefined>(undefined);

const CategoryContext: React.FC<Props> = ({ children }) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const categoryData = await GetAllCategories();
                setCategories(categoryData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        })();
    }, []);

    const onAddCategory = async (name: string) => {
        try {
            const newCategory = await CreateCategory(name);
            setCategories([...categories, newCategory]);
            alert('Category added successfully');
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category');
        }
    };

    const onUpdateCategory = async (id: string, name: string) => {
        try {
            const updatedCategory = await UpdateCategory(id, name);
            setCategories(categories.map(category => category.id === id ? updatedCategory : category));
            alert('Category updated successfully');
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category');
        }
    };

    const onDeleteCategory = async (id: string) => {
        try {
            await DeleteCategory(id);
            setCategories(categories.filter(category => category.id !== id));
            alert('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    return (
        <CategoryCT.Provider value={{ categories, onAddCategory, onUpdateCategory, onDeleteCategory }}>
            {children}
        </CategoryCT.Provider>
    );
};

export default CategoryContext;
