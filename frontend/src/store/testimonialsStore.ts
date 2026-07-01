import type { Testimonial } from "../models/Testimonial";

import { testimonialService } from "../services/testimonialService";

export const testimonialsStore = {
    getAll(): Testimonial[] {
        return testimonialService.getAll();
    },

    getActive(): Testimonial[] {
        return testimonialService.getActive();
    },

    getById(id: number): Testimonial | undefined {
        return testimonialService.getById(id);
    },
};