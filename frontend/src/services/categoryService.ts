import type { Category } from "../models/Category";

import { supabase } from "../lib/supabase";
import { BaseCrudService } from "./BaseCrudService";

class CategoryService extends BaseCrudService<Category> {
    constructor() {
        super("categories");
    }

    async getActive(): Promise<Category[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .order("name");

        this.handleError(error);

        return (data ?? []) as Category[];
    }

    async search(term: string): Promise<Category[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .ilike("name", `%${term}%`)
            .order("name");

        this.handleError(error);

        return (data ?? []) as Category[];
    }
}

export const categoryService = new CategoryService();