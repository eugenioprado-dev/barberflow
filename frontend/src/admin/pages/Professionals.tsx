import { useState } from "react";

import { AdminDrawer } from "../components/AdminDrawer";
import { ProfessionalForm } from "../components/ProfessionalForm";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { PageHeader } from "../components/PageHeader";
import { DataTable } from "../components/table/DataTable";
import { StatusBadge } from "../components/table/StatusBadge";
import { TableActions } from "../components/table/TableActions";
import { TableSearch } from "../components/table/TableSearch";
import { useProfessionals } from "../hooks/useProfessionals";
import type { Professional } from "../../models/Professional";
import { FaPlus, FaWhatsapp } from "react-icons/fa";
import { PageActionButton } from "../components/PageActionButton";

export function Professionals() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [professionalToDelete, setProfessionalToDelete] =
        useState<number | null>(null);
    const [selectedProfessional, setSelectedProfessional] =
        useState<Professional | undefined>();

    const {
        professionals,
        createProfessional,
        updateProfessional,
        deleteProfessional,
    } = useProfessionals();

    const filteredProfessionals = professionals.filter((professional) =>
        professional.name.toLowerCase().includes(search.toLowerCase())
    );

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    ).length;

    return (
        <div>
            <PageHeader
                title="Profissionais"
                description={`${activeProfessionals} profissionais ativos no site.`}
                action={
                    <PageActionButton
                        icon={<FaPlus />}
                        label="Novo Profissional"
                        onClick={() => {
                            setSelectedProfessional(undefined);
                            setDrawerOpen(true);
                        }}
                    />
                }
            />

            <TableSearch
                value={search}
                placeholder="Buscar profissional..."
                onChange={setSearch}
            />

            <DataTable
                isEmpty={filteredProfessionals.length === 0}
                emptyMessage="Nenhum profissional encontrado."
                headers={
                    <>
                        <div className="col-span-5">Profissional</div>
                        <div className="col-span-3">Especialidade</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Ações</div>
                    </>
                }
            >
                {filteredProfessionals.map((professional) => (
                    <div
                        key={professional.id}
                        className="grid gap-5 border-b border-white/10 px-6 py-5 last:border-b-0 lg:grid-cols-12 lg:items-center"
                    >
                        <div className="flex items-center gap-4 lg:col-span-5">
                            <img
                                src={professional.image}
                                alt={professional.name}
                                className="h-14 w-14 rounded-2xl object-cover"
                            />

                            <div>
                                <p className="font-semibold text-white">
                                    {professional.name}
                                </p>

                                <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                                    <FaWhatsapp />
                                    {professional.whatsapp}
                                </p>
                            </div>
                        </div>

                        <div className="text-zinc-300 lg:col-span-3">
                            {professional.role}
                        </div>

                        <div className="lg:col-span-2">
                            <StatusBadge active={professional.active} />
                        </div>

                        <div className="lg:col-span-2">
                            <TableActions
                                editLabel={`Editar ${professional.name}`}
                                deleteLabel={`Excluir ${professional.name}`}
                                onEdit={() => {
                                    setSelectedProfessional(professional);
                                    setDrawerOpen(true);
                                }}
                                onDelete={() =>
                                    setProfessionalToDelete(professional.id)
                                }
                            />
                        </div>
                    </div>
                ))}
            </DataTable>

            <AdminDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={
                    selectedProfessional
                        ? "Editar Profissional"
                        : "Novo Profissional"
                }
                description={
                    selectedProfessional
                        ? "Atualize os dados do profissional selecionado."
                        : "Cadastre um novo profissional para exibição no site."
                }
            >
                <ProfessionalForm
                    key={selectedProfessional?.id ?? "new"}
                    professional={selectedProfessional}
                    onCancel={() => setDrawerOpen(false)}
                    onSave={(data) => {
                        if (selectedProfessional) {
                            updateProfessional(selectedProfessional.id, data);
                        } else {
                            createProfessional(data);
                        }

                        setDrawerOpen(false);
                    }}
                />
            </AdminDrawer>

            <ConfirmDialog
                open={professionalToDelete !== null}
                title="Excluir profissional"
                description="Tem certeza que deseja excluir este profissional? Esta ação não poderá ser desfeita."
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onCancel={() => setProfessionalToDelete(null)}
                onConfirm={() => {
                    if (professionalToDelete !== null) {
                        deleteProfessional(professionalToDelete);
                    }

                    setProfessionalToDelete(null);
                }}
            />
        </div>
    );
}