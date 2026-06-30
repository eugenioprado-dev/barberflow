import type { GalleryFormData } from "../models/GalleryFormData";

export interface GalleryFormErrors {
    title?: string;
    description?: string;
    image?: string;
    professionalId?: string;
}

export function validateGalleryForm(
    form: GalleryFormData
): GalleryFormErrors {
    const errors: GalleryFormErrors = {};

    if (!form.title.trim()) {
        errors.title = "Informe o título da imagem.";
    }

    if (!form.description.trim()) {
        errors.description = "Informe uma descrição.";
    }

    if (!form.professionalId) {
        errors.professionalId = "Selecione um profissional.";
    }

    return errors;
}