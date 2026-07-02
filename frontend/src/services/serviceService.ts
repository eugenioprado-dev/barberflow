import type { Service } from "../models/Service";

import { supabase } from "../lib/supabase";
import { BaseCrudService } from "./BaseCrudService";

class ServiceService extends BaseCrudService<Service> {
    constructor() {
        super("services");
    }

    async getActive(): Promise<Service[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .order("name");

        this.handleError(error);

        return (data ?? []) as Service[];
    }

    async getByCategory(categoryId: number): Promise<Service[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .eq("category_id", categoryId)
            .order("name");

        this.handleError(error);

        return (data ?? []) as Service[];
    }

    async getByProfessional(professionalId: number): Promise<Service[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .eq("professional_id", professionalId)
            .order("name");

        this.handleError(error);

        return (data ?? []) as Service[];
    }
}

export const serviceService = new ServiceService();