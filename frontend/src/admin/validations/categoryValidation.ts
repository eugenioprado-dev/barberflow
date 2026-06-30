import type { CategoryFormData } from "../models/CategoryFormData";

export interface CategoryFormErrors {
    name?: string;
    icon?: string;
    description?: string;
}

export function validateCategoryForm(
    form: CategoryFormData
): CategoryFormErrors {
    const errors: CategoryFormErrors = {};

    if (!form.name.trim()) {
        errors.name = "Informe o nome da categoria.";
    }

    if (!form.icon.trim()) {
        errors.icon = "Selecione um ícone.";
    }

    if (!form.description.trim()) {
        errors.description =
            "Informe uma descrição para a categoria.";
    }

    return errors;
}