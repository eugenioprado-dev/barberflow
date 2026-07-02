import { supabase } from "../lib/supabase";

type CreatePayload<T> = Omit<T, "id">;
type UpdatePayload<T> = Partial<Omit<T, "id">>;

export abstract class BaseCrudService<T extends { id: number }> {
    protected readonly table: string;

    constructor(table: string) {
        this.table = table;
    }

    protected handleError(error: unknown): void {
        if (error) {
            throw error;
        }
    }

    async getAll(): Promise<T[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*");

        this.handleError(error);

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

    async create(item: CreatePayload<T>): Promise<T> {
        const { data, error } = await supabase
            .from(this.table)
            .insert(item as never)
            .select()
            .single();

        this.handleError(error);

        return data as T;
    }

    async update(
        id: number,
        item: UpdatePayload<T>
    ): Promise<T> {
        const { data, error } = await supabase
            .from(this.table)
            .update(item as never)
            .eq("id", id)
            .select()
            .single();

        this.handleError(error);

        return data as T;
    }

    async delete(id: number): Promise<void> {
        const { error } = await supabase
            .from(this.table)
            .delete()
            .eq("id", id);

        this.handleError(error);
    }
}