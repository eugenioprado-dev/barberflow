import { useState } from "react";

import type { Testimonial } from "../../models/Testimonial";
import type { TestimonialFormData } from "../models/TestimonialFormData";

import {
    validateTestimonialForm,
    type TestimonialFormErrors,
} from "../validations/testimonialValidation";

import { TextField } from "../../components/ui/form/TextField";
import { TextArea } from "../../components/ui/form/TextArea";
import { SwitchField } from "../../components/ui/form/SwitchField";
import { FormActions } from "../../components/ui/form/FormActions";
import { ImageUpload } from "../../components/ui/form/ImageUpload";

interface TestimonialFormProps {
    testimonial?: Testimonial;
    onCancel: () => void;
    onSave: (data: TestimonialFormData) => void | Promise<void>;
}

export function TestimonialForm({
    testimonial,
    onCancel,
    onSave,
}: TestimonialFormProps) {
    const [form, setForm] = useState<TestimonialFormData>({
        name: testimonial?.name ?? "",
        role: testimonial?.role ?? "Cliente",
        image: null,
        content: testimonial?.content ?? "",
        rating: testimonial?.rating ?? 5,
        active: testimonial?.active ?? true,
    });

    const [errors, setErrors] =
        useState<TestimonialFormErrors>({});

    function updateField<K extends keyof TestimonialFormData>(
        field: K,
        value: TestimonialFormData[K]
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
        const validationErrors = validateTestimonialForm(form);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await onSave(form);
    }

    return (
        <div className="space-y-5">
            <TextField
                label="Nome do cliente"
                placeholder="Ex: Marcos Silva"
                value={form.name}
                error={errors.name}
                onChange={(event) =>
                    updateField("name", event.target.value)
                }
            />

            <TextField
                label="Descrição curta"
                placeholder="Ex: Cliente"
                value={form.role}
                error={errors.role}
                onChange={(event) =>
                    updateField("role", event.target.value)
                }
            />

            <TextArea
                label="Depoimento"
                placeholder="Digite o depoimento do cliente..."
                value={form.content}
                error={errors.content}
                onChange={(event) =>
                    updateField("content", event.target.value)
                }
            />

            <TextField
                label="Nota"
                type="number"
                min={1}
                max={5}
                value={form.rating}
                error={errors.rating}
                onChange={(event) =>
                    updateField("rating", Number(event.target.value))
                }
            />

            <ImageUpload
                label="Foto do cliente"
                initialPreview={testimonial?.image}
                onChange={(file) => updateField("image", file)}
            />

            <SwitchField
                label="Depoimento ativo"
                description="Exibir este depoimento no site."
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