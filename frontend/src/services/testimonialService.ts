import type { Testimonial } from "../models/Testimonial";

import { testimonials } from "../data/testimonials";

export const testimonialService = {
    getAll(): Testimonial[] {
        return testimonials;
    },

    getActive(): Testimonial[] {
        return testimonials.filter(
            (testimonial) => testimonial.active
        );
    },

    getById(id: number): Testimonial | undefined {
        return testimonials.find(
            (testimonial) => testimonial.id === id
        );
    },
};