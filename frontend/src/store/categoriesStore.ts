import type { Category } from "../models/Category";

import { categories } from "../data/categories";

export const categoriesStore = {
    getAll(): Category[] {
        return categories;
    },

    getActive(): Category[] {
        return categories.filter((category) => category.active);
    },

    getById(id: number): Category | undefined {
        return categories.find((category) => category.id === id);
    },

    getByName(name: string): Category | undefined {
        return categories.find((category) => category.name === name);
    },
};