import type { Professional } from "../models/Professional";

import { supabase } from "../lib/supabase";
import { BaseCrudService } from "./BaseCrudService";

class ProfessionalService extends BaseCrudService<Professional> {
    constructor() {
        super("professionals");
    }

    async getActive(): Promise<Professional[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .order("name");

        this.handleError(error);

        return (data ?? []) as Professional[];
    }
}

export const professionalService = new ProfessionalService();