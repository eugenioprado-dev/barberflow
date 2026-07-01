import { useState } from "react";

import { testimonialService } from "../services/testimonialService";

import type { Testimonial } from "../../models/Testimonial";
import type { TestimonialFormData } from "../models/TestimonialFormData";

export function useTestimonials() {
    const [testimonials, setTestimonials] =
        useState<Testimonial[]>(testimonialService.getAll());

    function createTestimonial(data: TestimonialFormData) {
        const testimonial = testimonialService.create(data);

        setTestimonials([...testimonialService.getAll()]);

        return testimonial;
    }

    function updateTestimonial(
        id: number,
        data: TestimonialFormData
    ) {
        const testimonial = testimonialService.update(id, data);

        setTestimonials([...testimonialService.getAll()]);

        return testimonial;
    }

    function deleteTestimonial(id: number) {
        testimonialService.delete(id);

        setTestimonials([...testimonialService.getAll()]);
    }

    return {
        testimonials,
        createTestimonial,
        updateTestimonial,
        deleteTestimonial,
    };
}