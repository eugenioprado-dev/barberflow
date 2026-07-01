import { useState } from "react";

import type { Service } from "../../models/Service";
import type { ServiceFormData } from "../models/ServiceFormData";
import { categoriesStore } from "../../store/categoriesStore";
import { professionalsStore } from "../../store/professionalsStore";

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
    onSave: (data: ServiceFormData) => void;
}

export function ServiceForm({
    service,
    onCancel,
    onSave,
}: ServiceFormProps) {
    const professionals = professionalsStore.getActive();
    const categories = categoriesStore.getActive();
    const [form, setForm] = useState<ServiceFormData>({
        name: service?.name ?? "",
        category: service?.category ?? categories[0]?.name ?? "",
        professionalId: service?.professionalId ?? 1,
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

    function handleSubmit() {
        const validationErrors = validateServiceForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSave(form);
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
                value={form.category}
                error={errors.category}
                onChange={(event) =>
                    updateField("category", event.target.value)
                }
                options={categories.map((category) => ({
                    label: category.name,
                    value: category.name,
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
                options={professionals.map((professional) => ({
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