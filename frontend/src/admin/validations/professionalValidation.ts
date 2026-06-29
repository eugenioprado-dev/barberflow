import type { ProfessionalFormData } from "../models/ProfessionalFormData";

export type ProfessionalFormErrors = Partial<
    Record<keyof ProfessionalFormData, string>
>;

export function validateProfessionalForm(
    form: ProfessionalFormData
): ProfessionalFormErrors {
    const errors: ProfessionalFormErrors = {};

    if (!form.name.trim()) {
        errors.name = "Informe o nome do profissional.";
    }

    if (!form.role.trim()) {
        errors.role = "Informe a especialidade.";
    }

    if (!form.whatsapp.trim()) {
        errors.whatsapp = "Informe o WhatsApp.";
    }

    if (
        form.instagram &&
        !form.instagram.startsWith("http")
    ) {
        errors.instagram = "Informe uma URL válida.";
    }

    return errors;
}