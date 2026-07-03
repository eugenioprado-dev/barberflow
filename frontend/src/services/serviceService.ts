import type { Service } from "../models/Service";

import { supabase } from "../lib/supabase";
import { BaseCrudService } from "./BaseCrudService";

interface ServiceRow {
    id: number;
    category_id: number;
    professional_id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    active: boolean;
}

function mapRowToService(row: ServiceRow): Service {
    return {
        id: row.id,
        categoryId: row.category_id,
        professionalId: row.professional_id,
        name: row.name,
        description: row.description,
        price: Number(row.price),
        duration: row.duration,
        active: row.active,
    };
}

function mapServiceToRow(data: Omit<Service, "id">) {
    return {
        category_id: data.categoryId,
        professional_id: data.professionalId,
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        active: data.active,
    };
}

class ServiceService extends BaseCrudService<Service> {
    constructor() {
        super("services");
    }

    async getAll(): Promise<Service[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .order("name");

        this.handleError(error);

        return (data ?? []).map((row) =>
            mapRowToService(row as ServiceRow)
        );
    }

    async getActive(): Promise<Service[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .order("name");

        this.handleError(error);

        return (data ?? []).map((row) =>
            mapRowToService(row as ServiceRow)
        );
    }

    async create(data: Omit<Service, "id">): Promise<Service> {
        const { data: created, error } = await supabase
            .from(this.table)
            .insert(mapServiceToRow(data))
            .select()
            .single();

        this.handleError(error);

        return mapRowToService(created as ServiceRow);
    }

    async update(
        id: number,
        data: Partial<Omit<Service, "id">>
    ): Promise<Service> {
        const rowData = {
            ...(data.categoryId !== undefined && {
                category_id: data.categoryId,
            }),
            ...(data.professionalId !== undefined && {
                professional_id: data.professionalId,
            }),
            ...(data.name !== undefined && { name: data.name }),
            ...(data.description !== undefined && {
                description: data.description,
            }),
            ...(data.price !== undefined && { price: data.price }),
            ...(data.duration !== undefined && {
                duration: data.duration,
            }),
            ...(data.active !== undefined && { active: data.active }),
        };

        const { data: updated, error } = await supabase
            .from(this.table)
            .update(rowData)
            .eq("id", id)
            .select()
            .single();

        this.handleError(error);

        return mapRowToService(updated as ServiceRow);
    }
}

export const serviceService = new ServiceService();