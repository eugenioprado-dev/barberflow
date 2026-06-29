import { useState } from "react";

import type { Professional } from "../../models/Professional";
import type { ProfessionalFormData } from "../models/ProfessionalFormData";

import {
    validateProfessionalForm,
    type ProfessionalFormErrors,
} from "../validations/professionalValidation";

import { TextField } from "../../components/ui/form/TextField";
import { SwitchField } from "../../components/ui/form/SwitchField";
import { FormActions } from "../../components/ui/form/FormActions";
import { ImageUpload } from "../../components/ui/form/ImageUpload";

interface ProfessionalFormProps {
    professional?: Professional;
    onCancel: () => void;
    onSave: (data: ProfessionalFormData) => void;
}

export function ProfessionalForm({
    professional,
    onCancel,
    onSave,
}: ProfessionalFormProps) {
    const initialForm: ProfessionalFormData = {
        name: professional?.name ?? "",
        role: professional?.role ?? "",
        whatsapp: professional?.whatsapp ?? "",
        instagram: professional?.instagram ?? "",
        active: professional?.active ?? true,
        image: null,
    };

    const [form, setForm] = useState<ProfessionalFormData>(initialForm);
    const [errors, setErrors] = useState<ProfessionalFormErrors>({});

    function updateField<K extends keyof ProfessionalFormData>(
        field: K,
        value: ProfessionalFormData[K]
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
        const validationErrors = validateProfessionalForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(form);
    }

    return (
        <div className="space-y-5">
            <TextField
                label="Nome"
                placeholder="Digite o nome"
                value={form.name}
                error={errors.name}
                onChange={(event) => updateField("name", event.target.value)}
            />

            <TextField
                label="Especialidade"
                placeholder="Ex: Especialista em Cortes Unissex"
                value={form.role}
                error={errors.role}
                onChange={(event) => updateField("role", event.target.value)}
            />

            <TextField
                label="WhatsApp"
                placeholder="Ex: 5511999999999"
                value={form.whatsapp}
                error={errors.whatsapp}
                onChange={(event) =>
                    updateField("whatsapp", event.target.value)
                }
            />

            <TextField
                label="Instagram"
                placeholder="Ex: https://instagram.com/andredias"
                value={form.instagram}
                error={errors.instagram}
                onChange={(event) =>
                    updateField("instagram", event.target.value)
                }
            />

            <ImageUpload
                label="Foto do profissional"
                error={errors.image}
                onChange={(file) => updateField("image", file)}
            />

            <SwitchField
                label="Profissional ativo"
                description="Exibir este profissional no site."
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