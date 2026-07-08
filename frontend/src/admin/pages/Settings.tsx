import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { PageHeader } from "../components/PageHeader";
import { AdminLoading } from "../components/AdminLoading";

import { TextField } from "../../components/ui/form/TextField";
import { TextArea } from "../../components/ui/form/TextArea";
import { FormActions } from "../../components/ui/form/FormActions";

import type { SettingsFormData } from "../models/SettingsFormData";
import { siteService } from "../../services/siteService";
import { useSite } from "../../hooks/useSite";

const emptyForm: SettingsFormData = {
    name: "",
    subtitle: "",
    slogan: "",
    description: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    email: "",
    address: "",
    openingHours: "",
};

export function Settings() {
    const { site, reload } = useSite();
    const [form, setForm] = useState<SettingsFormData>(emptyForm);

    useEffect(() => {
        if (!site) return;

        setForm({
            name: site.business.name,
            subtitle: site.business.subtitle,
            slogan: site.business.slogan,
            description: site.business.description,
            phone: site.business.phone,
            whatsapp: site.business.whatsapp,
            instagram: site.business.instagram,
            email: site.business.email,
            address: site.business.address,
            openingHours: site.business.openingHours,
        });
    }, [site]);

    function updateField<K extends keyof SettingsFormData>(
        field: K,
        value: SettingsFormData[K]
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSave() {
        if (!site) return;

        const updatedSite = {
            ...site,
            business: {
                ...site.business,
                name: form.name,
                subtitle: form.subtitle,
                slogan: form.slogan,
                description: form.description,
                phone: form.phone,
                whatsapp: form.whatsapp,
                instagram: form.instagram,
                email: form.email,
                address: form.address,
                openingHours: form.openingHours,
            },
        };

        try {
            await siteService.updateToSupabase(updatedSite);
            await reload();

            toast.success("Configurações salvas com sucesso.");
        } catch (error) {
            console.error("Erro ao salvar configurações:", error);
            toast.error("Erro ao salvar configurações.");
        }
    }

    function resetForm() {
        if (!site) return;

        setForm({
            name: site.business.name,
            subtitle: site.business.subtitle,
            slogan: site.business.slogan,
            description: site.business.description,
            phone: site.business.phone,
            whatsapp: site.business.whatsapp,
            instagram: site.business.instagram,
            email: site.business.email,
            address: site.business.address,
            openingHours: site.business.openingHours,
        });
    }

    return (
        <>
            <PageHeader
                title="Configurações"
                description="Gerencie as informações gerais do site."
            />

            {!site ? (
                <AdminLoading
                    title="Carregando configurações..."
                    description="Aguarde enquanto buscamos as informações gerais do site."
                />
            ) : (
                <div className="space-y-8">
                    <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8">
                        <h2 className="text-xl font-semibold text-white">
                            Empresa
                        </h2>

                        <div className="mt-6 space-y-5">
                            <TextField
                                label="Nome da empresa"
                                value={form.name}
                                onChange={(event) =>
                                    updateField(
                                        "name",
                                        event.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Subtítulo"
                                value={form.subtitle}
                                onChange={(event) =>
                                    updateField(
                                        "subtitle",
                                        event.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Slogan"
                                value={form.slogan}
                                onChange={(event) =>
                                    updateField(
                                        "slogan",
                                        event.target.value
                                    )
                                }
                            />

                            <TextArea
                                label="Descrição"
                                value={form.description}
                                onChange={(event) =>
                                    updateField(
                                        "description",
                                        event.target.value
                                    )
                                }
                            />
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8">
                        <h2 className="text-xl font-semibold text-white">
                            Contatos
                        </h2>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <TextField
                                label="Telefone"
                                value={form.phone}
                                onChange={(event) =>
                                    updateField(
                                        "phone",
                                        event.target.value
                                    )
                                }
                            />

                            <TextField
                                label="WhatsApp"
                                value={form.whatsapp}
                                onChange={(event) =>
                                    updateField(
                                        "whatsapp",
                                        event.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Instagram"
                                value={form.instagram}
                                onChange={(event) =>
                                    updateField(
                                        "instagram",
                                        event.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Email"
                                value={form.email}
                                onChange={(event) =>
                                    updateField(
                                        "email",
                                        event.target.value
                                    )
                                }
                            />

                            <div className="md:col-span-2">
                                <TextField
                                    label="Endereço"
                                    value={form.address}
                                    onChange={(event) =>
                                        updateField(
                                            "address",
                                            event.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="md:col-span-2">
                                <TextArea
                                    label="Horário de funcionamento"
                                    value={form.openingHours}
                                    onChange={(event) =>
                                        updateField(
                                            "openingHours",
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    <FormActions
                        onCancel={resetForm}
                        onSubmit={handleSave}
                    />
                </div>
            )}
        </>
    );
}