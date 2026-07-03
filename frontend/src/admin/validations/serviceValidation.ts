import type { ServiceFormData } from "../models/ServiceFormData";

export interface ServiceFormErrors {
    name?: string;
    categoryId?: string;
    professionalId?: string;
    description?: string;
    price?: string;
    duration?: string;
}

export function validateServiceForm(
    form: ServiceFormData
): ServiceFormErrors {
    const errors: ServiceFormErrors = {};

    if (!form.name.trim()) {
        errors.name = "Informe o nome do serviço.";
    }

    if (!form.categoryId) {
        errors.categoryId = "Selecione uma categoria.";
    }

    if (!form.professionalId) {
        errors.professionalId = "Selecione um profissional.";
    }

    if (!form.description.trim()) {
        errors.description = "Informe a descrição.";
    }

    if (form.price <= 0) {
        errors.price = "O preço deve ser maior que zero.";
    }

    if (form.duration <= 0) {
        errors.duration = "A duração deve ser maior que zero.";
    }

    return errors;
}