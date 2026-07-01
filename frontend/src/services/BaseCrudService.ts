import { supabase } from "../lib/supabase";

export class BaseCrudService<T extends { id: number }> {
    constructor(private readonly table: string) {}

    async getAll(): Promise<T[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*");

        if (error) {
            throw error;
        }

        return (data ?? []) as T[];
    }

    async getById(id: number): Promise<T | null> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return null;
        }

        return data as T;
    }

    async create(item: Omit<T, "id">): Promise<T> {
        const { data, error } = await supabase
            .from(this.table)
            .insert(item)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data as T;
    }

    async update(
        id: number,
        item: Partial<Omit<T, "id">>
    ): Promise<T> {
        const { data, error } = await supabase
            .from(this.table)
            .update(item)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data as T;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from(this.table)
            .delete()
            .eq("id", id);

        if (error) {
            throw error;
        }
    }
}