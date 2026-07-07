import { useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

import { PageHeader } from "../components/PageHeader";
import { PageActionButton } from "../components/PageActionButton";
import { AdminDrawer } from "../components/AdminDrawer";
import { ConfirmDialog } from "../components/ConfirmDialog";

import { DataTable } from "../components/table/DataTable";
import { StatusBadge } from "../components/table/StatusBadge";
import { TableActions } from "../components/table/TableActions";
import { TableSearch } from "../components/table/TableSearch";

import { TestimonialForm } from "../components/TestimonialForm";

import { useTestimonials } from "../../hooks/useTestimonials";
import { storageService } from "../../services/storageService";

import type { Testimonial } from "../../models/Testimonial";

export function Testimonials() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [selectedTestimonial, setSelectedTestimonial] =
        useState<Testimonial>();

    const [testimonialToDelete, setTestimonialToDelete] =
        useState<number | null>(null);

    const {
        testimonials,
        createTestimonial,
        updateTestimonial,
        deleteTestimonial,
    } = useTestimonials();

    const filteredTestimonials = testimonials.filter((testimonial) =>
        testimonial.name.toLowerCase().includes(search.toLowerCase())
    );

    const activeTestimonials = testimonials.filter(
        (testimonial) => testimonial.active
    ).length;

    function closeDrawer() {
        setDrawerOpen(false);
        setSelectedTestimonial(undefined);
    }

    return (
        <>
            <PageHeader
                title="Depoimentos"
                description={`${activeTestimonials} depoimentos ativos no site.`}
                action={
                    <PageActionButton
                        icon={<FaPlus />}
                        label="Novo Depoimento"
                        onClick={() => {
                            setSelectedTestimonial(undefined);
                            setDrawerOpen(true);
                        }}
                    />
                }
            />

            <TableSearch
                value={search}
                placeholder="Buscar depoimento..."
                onChange={setSearch}
            />

            <DataTable
                isEmpty={filteredTestimonials.length === 0}
                emptyMessage="Nenhum depoimento encontrado."
                headers={
                    <>
                        <div className="col-span-3">Cliente</div>
                        <div className="col-span-4">Depoimento</div>
                        <div className="col-span-2">Nota</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-2 text-right">Ações</div>
                    </>
                }
            >
                {filteredTestimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="grid gap-5 border-b border-white/10 px-6 py-5 last:border-b-0 lg:grid-cols-12 lg:items-center"
                    >
                        <div className="flex items-center gap-4 lg:col-span-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-zinc-800 text-zinc-500">
                                {testimonial.image ? (
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    testimonial.name.charAt(0)
                                )}
                            </div>

                            <div>
                                <p className="font-semibold text-white">
                                    {testimonial.name}
                                </p>

                                <p className="text-sm text-zinc-500">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>

                        <div className="line-clamp-2 text-zinc-300 lg:col-span-4">
                            {testimonial.content}
                        </div>

                        <div className="flex items-center gap-1 text-amber-400 lg:col-span-2">
                            {Array.from({
                                length: Math.min(testimonial.rating, 5),
                            }).map((_, index) => (
                                <FaStar key={index} />
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <StatusBadge active={testimonial.active} />
                        </div>

                        <div className="lg:col-span-2">
                            <TableActions
                                editLabel={`Editar ${testimonial.name}`}
                                deleteLabel={`Excluir ${testimonial.name}`}
                                onEdit={() => {
                                    setSelectedTestimonial(testimonial);
                                    setDrawerOpen(true);
                                }}
                                onDelete={() =>
                                    setTestimonialToDelete(testimonial.id)
                                }
                            />
                        </div>
                    </div>
                ))}
            </DataTable>

            <AdminDrawer
                open={drawerOpen}
                onClose={closeDrawer}
                title={
                    selectedTestimonial
                        ? "Editar Depoimento"
                        : "Novo Depoimento"
                }
                description={
                    selectedTestimonial
                        ? "Atualize os dados do depoimento."
                        : "Cadastre um novo depoimento para exibição no site."
                }
            >
                <TestimonialForm
                    key={selectedTestimonial?.id ?? "new"}
                    testimonial={selectedTestimonial}
                    onCancel={closeDrawer}
                    onSave={async (data) => {
                        let imageUrl = selectedTestimonial?.image ?? "";

                        if (data.image) {
                            imageUrl = await storageService.upload(
                                data.image,
                                "testimonials"
                            );
                        }

                        const payload = {
                            name: data.name,
                            role: data.role,
                            image: imageUrl,
                            content: data.content,
                            rating: data.rating,
                            active: data.active,
                        };

                        try {
                            if (selectedTestimonial) {
                                await updateTestimonial(
                                    selectedTestimonial.id,
                                    payload
                                );

                                toast.success(
                                    "Depoimento atualizado com sucesso."
                                );
                            } else {
                                await createTestimonial(payload);

                                toast.success(
                                    "Depoimento cadastrado com sucesso."
                                );
                            }

                            closeDrawer();
                        } catch (error) {
                            console.error(
                                "Erro ao salvar depoimento:",
                                error
                            );

                            toast.error(
                                "Erro ao salvar depoimento."
                            );
                        }
                    }}
                />
            </AdminDrawer>

            <ConfirmDialog
                open={testimonialToDelete !== null}
                title="Excluir depoimento"
                description="Tem certeza que deseja excluir este depoimento?"
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onCancel={() => setTestimonialToDelete(null)}
                onConfirm={async () => {
                    if (testimonialToDelete !== null) {
                        await deleteTestimonial(testimonialToDelete);
                        toast.success("Depoimento excluído com sucesso.");
                    }

                    setTestimonialToDelete(null);
                }}
            />
        </>
    );
}