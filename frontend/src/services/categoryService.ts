import type { Category } from "../models/Category";

import { BaseCrudService } from "./BaseCrudService";

export const categoryService = new BaseCrudService<Category>(
    "categories"
);