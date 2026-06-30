import type { Category } from "../../models/Category";
import type { CategoryFormData } from "../models/CategoryFormData";

import { categories } from "../../data/categories";

export const categoryService = {
    getAll(): Category[] {
        return categories;
    },

    create(data: CategoryFormData): Category {
        const newCategory: Category = {
            id: Date.now(),
            name: data.name,
            icon: data.icon,
            description: data.description,
            active: data.active,
        };

        categories.push(newCategory);

        return newCategory;
    },

    update(id: number, data: CategoryFormData): Category | null {
        const category = categories.find((item) => item.id === id);

        if (!category) {
            return null;
        }

        category.name = data.name;
        category.icon = data.icon;
        category.description = data.description;
        category.active = data.active;

        return category;
    },

    delete(id: number): void {
        const index = categories.findIndex((category) => category.id === id);

        if (index !== -1) {
            categories.splice(index, 1);
        }
    },
};