import { useState } from "react";

import type { Category } from "../../models/Category";
import type { CategoryFormData } from "../models/CategoryFormData";

import {
    validateCategoryForm,
    type CategoryFormErrors,
} from "../validations/categoryValidation";

import { TextField } from "../../components/ui/form/TextField";
import { TextArea } from "../../components/ui/form/TextArea";
import { SelectField } from "../../components/ui/form/SelectField";
import { SwitchField } from "../../components/ui/form/SwitchField";
import { FormActions } from "../../components/ui/form/FormActions";

interface CategoryFormProps {
    category?: Category;
    onCancel: () => void;
    onSave: (data: CategoryFormData) => void;
}

export function CategoryForm({
    category,
    onCancel,
    onSave,
}: CategoryFormProps) {
    const [form, setForm] = useState<CategoryFormData>({
        name: category?.name ?? "",
        icon: category?.icon ?? "cut",
        description: category?.description ?? "",
        active: category?.active ?? true,
    });

    const [errors, setErrors] = useState<CategoryFormErrors>({});

    function updateField<K extends keyof CategoryFormData>(
        field: K,
        value: CategoryFormData[K]
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
        const validationErrors = validateCategoryForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(form);
    }

    return (
        <div className="space-y-5">
            <TextField
                label="Nome da categoria"
                placeholder="Ex: Barbearia"
                value={form.name}
                error={errors.name}
                onChange={(event) =>
                    updateField("name", event.target.value)
                }
            />

            <SelectField
                label="Ícone"
                value={form.icon}
                error={errors.icon}
                onChange={(event) =>
                    updateField("icon", event.target.value)
                }
                options={[
                    {
                        label: "✂️ Barbearia",
                        value: "cut",
                    },
                    {
                        label: "💅 Manicure",
                        value: "hand",
                    },
                    {
                        label: "🦶 Pedicure",
                        value: "foot",
                    },
                    {
                        label: "💆 Spa / Massagem",
                        value: "spa",
                    },
                ]}
            />

            <TextArea
                label="Descrição"
                placeholder="Descrição da categoria..."
                value={form.description}
                error={errors.description}
                onChange={(event) =>
                    updateField("description", event.target.value)
                }
            />

            <SwitchField
                label="Categoria ativa"
                description="Exibir esta categoria no site."
                checked={form.active}
                onChange={(checked) =>
                    updateField("active", checked)
                }
            />

            <FormActions
                onCancel={onCancel}
                onSubmit={handleSubmit}
            />
        </div>
    );
}