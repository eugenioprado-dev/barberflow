import type { Testimonial } from "../../models/Testimonial";
import type { TestimonialFormData } from "../models/TestimonialFormData";

import { testimonials } from "../../data/testimonials";

const createImagePreview = (file: File | null): string => {
    if (!file) {
        return "";
    }

    return URL.createObjectURL(file);
};

export const testimonialService = {
    getAll(): Testimonial[] {
        return testimonials;
    },

    create(data: TestimonialFormData): Testimonial {
        const newTestimonial: Testimonial = {
            id: Date.now(),
            name: data.name,
            role: data.role,
            image: createImagePreview(data.image),
            content: data.content,
            rating: data.rating,
            active: data.active,
        };

        testimonials.push(newTestimonial);

        return newTestimonial;
    },

    update(
        id: number,
        data: TestimonialFormData
    ): Testimonial | null {
        const testimonial = testimonials.find(
            (item) => item.id === id
        );

        if (!testimonial) {
            return null;
        }

        testimonial.name = data.name;
        testimonial.role = data.role;
        testimonial.content = data.content;
        testimonial.rating = data.rating;
        testimonial.active = data.active;

        if (data.image) {
            testimonial.image = createImagePreview(data.image);
        }

        return testimonial;
    },

    delete(id: number): void {
        const index = testimonials.findIndex(
            (item) => item.id === id
        );

        if (index !== -1) {
            testimonials.splice(index, 1);
        }
    },
};