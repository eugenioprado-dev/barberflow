import { useEffect, useState } from "react";

import type { Gallery } from "../../models/Gallery";
import type { GalleryFormData } from "../models/GalleryFormData";

import { useProfessionals } from "../../hooks/useProfessionals";

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
    onSave: (data: GalleryFormData) => void | Promise<void>;
}

export function GalleryForm({
    galleryItem,
    onCancel,
    onSave,
}: GalleryFormProps) {
    const { professionals } = useProfessionals();

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    );

    const [form, setForm] = useState<GalleryFormData>({
        title: galleryItem?.title ?? "",
        description: galleryItem?.description ?? "",
        image: null,
        images: [],
        professionalId:
            galleryItem?.professionalId ??
            activeProfessionals[0]?.id ??
            0,
        active: galleryItem?.active ?? true,
    });

    const [errors, setErrors] = useState<GalleryFormErrors>({});

    useEffect(() => {
        if (form.professionalId === 0 && activeProfessionals.length > 0) {
            setForm((current) => ({
                ...current,
                professionalId: activeProfessionals[0].id,
            }));
        }
    }, [activeProfessionals, form.professionalId]);

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

    async function handleSubmit() {
        const validationErrors = validateGalleryForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await onSave(form);
    }

    return (
        <div className="space-y-5">
            <TextField
                label="Título"
                placeholder="Ex: Morena iluminada"
                value={form.title}
                error={errors.title}
                onChange={(event) =>
                    updateField("title", event.target.value)
                }
            />

            <TextArea
                label="Descrição"
                placeholder="Descreva o trabalho..."
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
                options={activeProfessionals.map((professional) => ({
                    label: professional.name,
                    value: String(professional.id),
                }))}
            />

            <ImageUpload
                label="Imagem de capa"
                initialPreview={galleryItem?.image}
                error={errors.image}
                onChange={(file) => updateField("image", file)}
            />

            <MultiImageUpload
                label="Fotos adicionais"
                onChange={(files) => updateField("images", files)}
            />

            <SwitchField
                label="Trabalho ativo"
                description="Exibir este trabalho no site."
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