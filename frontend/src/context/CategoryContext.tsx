import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Category } from "../models/Category";
import { categoryService } from "../services/categoryService";

export interface CategoryContextData {
    categories: Category[];
    loading: boolean;
    reload: () => Promise<void>;
    createCategory: (data: Omit<Category, "id">) => Promise<Category>;
    updateCategory: (
        id: number,
        data: Partial<Omit<Category, "id">>
    ) => Promise<Category>;
    deleteCategory: (id: number) => Promise<void>;
}

export const CategoryContext =
    createContext<CategoryContextData | null>(null);

interface Props {
    children: ReactNode;
}

export function CategoryProvider({ children }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const reload = useCallback(async () => {
        setLoading(true);

        try {
            const data = await categoryService.getAll();

            setCategories(data);
        } finally {
            setLoading(false);
        }
    }, []);

    async function createCategory(data: Omit<Category, "id">) {
        const category = await categoryService.create(data);

        await reload();

        return category;
    }

    async function updateCategory(
        id: number,
        data: Partial<Omit<Category, "id">>
    ) {
        const category = await categoryService.update(id, data);

        await reload();

        return category;
    }

    async function deleteCategory(id: number) {
        await categoryService.delete(id);

        await reload();
    }

    useEffect(() => {
    async function loadCategories() {
        await reload();
    }

    void loadCategories();
}, [reload]);

    return (
        <CategoryContext.Provider
            value={{
                categories,
                loading,
                reload,
                createCategory,
                updateCategory,
                deleteCategory,
            }}
        >
            {children}
        </CategoryContext.Provider>
    );
}