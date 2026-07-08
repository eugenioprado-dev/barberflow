import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { AdminDrawer } from "../components/AdminDrawer";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageActionButton } from "../components/PageActionButton";
import { PageHeader } from "../components/PageHeader";
import { ServiceForm } from "../components/ServiceForm";
import { AdminLoading } from "../components/AdminLoading";

import { DataTable } from "../components/table/DataTable";
import { StatusBadge } from "../components/table/StatusBadge";
import { TableActions } from "../components/table/TableActions";
import { TableSearch } from "../components/table/TableSearch";

import { useServices } from "../../hooks/useServices";
import { useCategories } from "../../hooks/useCategories";

import type { Service } from "../../models/Service";

export function Services() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [serviceToDelete, setServiceToDelete] =
        useState<number | null>(null);

    const [selectedService, setSelectedService] =
        useState<Service | undefined>();

    const {
        services,
        loading: servicesLoading,
        createService,
        updateService,
        deleteService,
    } = useServices();

    const { categories, loading: categoriesLoading } =
        useCategories();

    const loading = servicesLoading || categoriesLoading;

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    const activeServices = services.filter(
        (service) => service.active
    ).length;

    function getCategoryName(categoryId: number) {
        return (
            categories.find((category) => category.id === categoryId)
                ?.name ?? "Categoria"
        );
    }

    return (
        <div>
            <PageHeader
                title="Serviços"
                description={
                    loading
                        ? "Carregando serviços..."
                        : `${activeServices} serviços ativos no site.`
                }
                action={
                    <PageActionButton
                        icon={<FaPlus />}
                        label="Novo Serviço"
                        onClick={() => {
                            setSelectedService(undefined);
                            setDrawerOpen(true);
                        }}
                    />
                }
            />

            <TableSearch
                value={search}
                placeholder="Buscar serviço..."
                onChange={setSearch}
            />

            {loading ? (
                <AdminLoading
                    title="Carregando serviços..."
                    description="Aguarde enquanto buscamos serviços e categorias."
                />
            ) : (
                <DataTable
                    isEmpty={filteredServices.length === 0}
                    emptyMessage="Nenhum serviço encontrado."
                    headers={
                        <>
                            <div className="col-span-3">Serviço</div>
                            <div className="col-span-2">
                                Categoria
                            </div>
                            <div className="col-span-2">Preço</div>
                            <div className="col-span-2">Duração</div>
                            <div className="col-span-1">Status</div>
                            <div className="col-span-2 text-right">
                                Ações
                            </div>
                        </>
                    }
                >
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="grid gap-5 border-b border-white/10 px-6 py-5 last:border-b-0 lg:grid-cols-12 lg:items-center"
                        >
                            <div className="lg:col-span-3">
                                <p className="font-semibold text-white">
                                    {service.name}
                                </p>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {service.description}
                                </p>
                            </div>

                            <div className="text-zinc-300 lg:col-span-2">
                                {getCategoryName(service.categoryId)}
                            </div>

                            <div className="text-zinc-300 lg:col-span-2">
                                R$ {service.price.toFixed(2)}
                            </div>

                            <div className="text-zinc-300 lg:col-span-2">
                                {service.duration} min
                            </div>

                            <div className="lg:col-span-1">
                                <StatusBadge active={service.active} />
                            </div>

                            <div className="lg:col-span-2">
                                <TableActions
                                    editLabel={`Editar ${service.name}`}
                                    deleteLabel={`Excluir ${service.name}`}
                                    onEdit={() => {
                                        setSelectedService(service);
                                        setDrawerOpen(true);
                                    }}
                                    onDelete={() =>
                                        setServiceToDelete(service.id)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </DataTable>
            )}

            <AdminDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={
                    selectedService
                        ? "Editar Serviço"
                        : "Novo Serviço"
                }
                description={
                    selectedService
                        ? "Atualize os dados do serviço selecionado."
                        : "Cadastre um novo serviço para exibição no site."
                }
            >
                <ServiceForm
                    key={selectedService?.id ?? "new"}
                    service={selectedService}
                    onCancel={() => setDrawerOpen(false)}
                    onSave={async (data) => {
                        if (selectedService) {
                            await updateService(
                                selectedService.id,
                                data
                            );
                        } else {
                            await createService(data);
                        }

                        setDrawerOpen(false);
                    }}
                />
            </AdminDrawer>

            <ConfirmDialog
                open={serviceToDelete !== null}
                title="Excluir serviço"
                description="Tem certeza que deseja excluir este serviço? Esta ação não poderá ser desfeita."
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onCancel={() => setServiceToDelete(null)}
                onConfirm={async () => {
                    if (serviceToDelete !== null) {
                        await deleteService(serviceToDelete);
                    }

                    setServiceToDelete(null);
                }}
            />
        </div>
    );
}