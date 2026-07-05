import type { Testimonial } from "../models/Testimonial";

import { supabase } from "../lib/supabase";
import { BaseCrudService } from "./BaseCrudService";

class TestimonialService extends BaseCrudService<Testimonial> {
    constructor() {
        super("testimonials");
    }

    async getActive(): Promise<Testimonial[]> {
        const { data, error } = await supabase
            .from(this.table)
            .select("*")
            .eq("active", true)
            .order("id");

        this.handleError(error);

        return (data ?? []) as Testimonial[];
    }
}

export const testimonialService =
    new TestimonialService();