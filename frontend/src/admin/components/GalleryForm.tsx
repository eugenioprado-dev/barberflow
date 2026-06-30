import { useState } from "react";

import type { Gallery } from "../../models/Gallery";
import type { GalleryFormData } from "../models/GalleryFormData";

import { professionals } from "../../data/professionals";

import { TextField } from "../../components/ui/form/TextField";
import { TextArea } from "../../components/ui/form/TextArea";
import { SelectField } from "../../components/ui/form/SelectField";
import { SwitchField } from "../../components/ui/form/SwitchField";
import { FormActions } from "../../components/ui/form/FormActions";
import { ImageUpload } from "../../components/ui/form/ImageUpload";
import { MultiImageUpload } from "../../components/ui/form/MultiImageUpload";

import {
    validateGalleryForm,
    type GalleryFormErrors,
} from "../validations/galleryValidation";

interface GalleryFormProps {
    galleryItem?: Gallery;
    onCancel: () => void;
    onSave: (data: GalleryFormData) => void;
}

export function GalleryForm({
    galleryItem,
    onCancel,
    onSave,
}: GalleryFormProps) {
    const [form, setForm] = useState<GalleryFormData>({
        title: galleryItem?.title ?? "",
        description: galleryItem?.description ?? "",
        image: null,
        images: [],
        professionalId: galleryItem?.professionalId ?? 1,
        active: galleryItem?.active ?? true,
    });

    const [errors, setErrors] = useState<GalleryFormErrors>({});

    function updateField<K extends keyof GalleryFormData>(
        field: K,
        value: GalleryFormData[K]
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: undefined,
        }));
    }

    function handleSubmit() {
        const validationErrors = validateGalleryForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(form);
    }

    return (
        <div className="space-y-5">
            <TextField
                label="Título"
                placeholder="Ex: Corte Clássico"
                value={form.title}
                error={errors.title}
                onChange={(event) =>
                    updateField("title", event.target.value)
                }
            />

            <TextArea
                label="Descrição"
                placeholder="Descreva a imagem..."
                value={form.description}
                error={errors.description}
                onChange={(event) =>
                    updateField("description", event.target.value)
                }
            />

            <SelectField
                label="Profissional"
                value={String(form.professionalId)}
                error={errors.professionalId}
                onChange={(event) =>
                    updateField(
                        "professionalId",
                        Number(event.target.value)
                    )
                }
                options={professionals.map((professional) => ({
                    label: professional.name,
                    value: String(professional.id),
                }))}
            />

            <ImageUpload
                label="Imagem da galeria"
                initialPreview={galleryItem?.image}
                error={errors.image}
                onChange={(file) => updateField("image", file)}
            />

            <MultiImageUpload
                label="Fotos adicionais"
                onChange={(files) => updateField("images", files)}
            />

            <SwitchField
                label="Imagem ativa"
                description="Exibir esta imagem no site."
                checked={form.active}
                onChange={(checked) => updateField("active", checked)}
            />

            <FormActions
                onCancel={onCancel}
                onSubmit={handleSubmit}
            />
        </div>
    );
}