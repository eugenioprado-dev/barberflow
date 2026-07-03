import { useState } from "react";

import type { Service } from "../../models/Service";
import type { ServiceFormData } from "../models/ServiceFormData";

import { useCategories } from "../../hooks/useCategories";
import { useProfessionals } from "../../hooks/useProfessionals";

import { TextField } from "../../components/ui/form/TextField";
import { TextArea } from "../../components/ui/form/TextArea";
import { SelectField } from "../../components/ui/form/SelectField";
import { SwitchField } from "../../components/ui/form/SwitchField";
import { FormActions } from "../../components/ui/form/FormActions";

import {
    validateServiceForm,
    type ServiceFormErrors,
} from "../validations/serviceValidation";

interface ServiceFormProps {
    service?: Service;
    onCancel: () => void;
    onSave: (data: ServiceFormData) => void | Promise<void>;
}

export function ServiceForm({
    service,
    onCancel,
    onSave,
}: ServiceFormProps) {
    const { categories } = useCategories();
    const { professionals } = useProfessionals();

    const activeCategories = categories.filter(
        (category) => category.active
    );

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    );

    const [form, setForm] = useState<ServiceFormData>({
        name: service?.name ?? "",
        categoryId: service?.categoryId ?? activeCategories[0]?.id ?? 0,
        professionalId:
            service?.professionalId ?? activeProfessionals[0]?.id ?? 0,
        description: service?.description ?? "",
        price: service?.price ?? 0,
        duration: service?.duration ?? 30,
        active: service?.active ?? true,
    });

    const [errors, setErrors] = useState<ServiceFormErrors>({});

    function updateField<K extends keyof ServiceFormData>(
        field: K,
        value: ServiceFormData[K]
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
        const validationErrors = validateServiceForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await onSave(form);
    }

    return (
        <div className="space-y-5">
            <TextField
                label="Nome do serviço"
                placeholder="Ex: Corte Masculino"
                value={form.name}
                error={errors.name}
                onChange={(event) =>
                    updateField("name", event.target.value)
                }
            />

            <SelectField
                label="Categoria"
                value={String(form.categoryId)}
                error={errors.categoryId}
                onChange={(event) =>
                    updateField(
                        "categoryId",
                        Number(event.target.value)
                    )
                }
                options={activeCategories.map((category) => ({
                    label: category.name,
                    value: String(category.id),
                }))}
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

            <TextField
                label="Preço"
                type="number"
                min={0}
                value={form.price}
                error={errors.price}
                onChange={(event) =>
                    updateField("price", Number(event.target.value))
                }
            />

            <TextField
                label="Duração em minutos"
                type="number"
                min={1}
                value={form.duration}
                error={errors.duration}
                onChange={(event) =>
                    updateField("duration", Number(event.target.value))
                }
            />

            <TextArea
                label="Descrição"
                placeholder="Descreva o serviço..."
                value={form.description}
                error={errors.description}
                onChange={(event) =>
                    updateField("description", event.target.value)
                }
            />

            <SwitchField
                label="Serviço ativo"
                description="Exibir este serviço no site."
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