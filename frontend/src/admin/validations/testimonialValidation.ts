import type { TestimonialFormData } from "../models/TestimonialFormData";

export interface TestimonialFormErrors {
    name?: string;
    role?: string;
    content?: string;
    rating?: string;
}

export function validateTestimonialForm(
    form: TestimonialFormData
): TestimonialFormErrors {
    const errors: TestimonialFormErrors = {};

    if (!form.name.trim()) {
        errors.name = "Informe o nome do cliente.";
    }

    if (!form.role.trim()) {
        errors.role = "Informe uma descrição curta, como Cliente.";
    }

    if (!form.content.trim()) {
        errors.content = "Informe o depoimento.";
    }

    if (form.rating < 1 || form.rating > 5) {
        errors.rating = "A nota deve estar entre 1 e 5.";
    }

    return errors;
}