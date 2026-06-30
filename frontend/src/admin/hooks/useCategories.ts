import { useState } from "react";

import { categoryService } from "../services/categoryService";

import type { Category } from "../../models/Category";
import type { CategoryFormData } from "../models/CategoryFormData";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>(
        categoryService.getAll()
    );

    const createCategory = (data: CategoryFormData) => {
        const category = categoryService.create(data);

        setCategories([...categoryService.getAll()]);

        return category;
    };

    const updateCategory = (
        id: number,
        data: CategoryFormData
    ) => {
        const category = categoryService.update(id, data);

        setCategories([...categoryService.getAll()]);

        return category;
    };

    const deleteCategory = (id: number) => {
        categoryService.delete(id);

        setCategories([...categoryService.getAll()]);
    };

    return {
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}