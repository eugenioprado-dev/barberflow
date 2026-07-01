import type { Category } from "../models/Category";

import { categoryService } from "../services/categoryService";

export const categoriesStore = {
    getAll(): Category[] {
        return categoryService.getAll();
    },

    getActive(): Category[] {
        return categoryService.getActive();
    },

    getById(id: number): Category | undefined {
        return categoryService.getById(id);
    },

    getByName(name: string): Category | undefined {
        return categoryService.getByName(name);
    },
};