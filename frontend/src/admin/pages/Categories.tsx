import { useState } from "react";

import { CategoryForm } from "../components/CategoryForm";
import { AdminDrawer } from "../components/AdminDrawer";
import { ConfirmDialog } from "../components/ConfirmDialog";

import { PageHeader } from "../components/PageHeader";
import { PageActionButton } from "../components/PageActionButton";

import { DataTable } from "../components/table/DataTable";
import { StatusBadge } from "../components/table/StatusBadge";
import { TableActions } from "../components/table/TableActions";
import { TableSearch } from "../components/table/TableSearch";
import { IconBadge } from "../../components/ui/IconBadge";

import { useCategories } from "../../hooks/useCategories";

import type { Category } from "../../models/Category";

import { FaPlus } from "react-icons/fa";

export function Categories() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [categoryToDelete, setCategoryToDelete] =
        useState<number | null>(null);

    const [selectedCategory, setSelectedCategory] =
        useState<Category | undefined>();

    const {
        categories,
        loading,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();

    const filteredCategories = categories.filter((category) =>
        category.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const activeCategories = categories.filter(
        (category) => category.active
    ).length;

    return (
        <>
            <PageHeader
                title="Categorias"
                description={
                    loading
                        ? "Carregando categorias..."
                        : `${activeCategories} categorias ativas.`
                }
                action={
                    <PageActionButton
                        icon={<FaPlus />}
                        label="Nova Categoria"
                        onClick={() => {
                            setSelectedCategory(undefined);
                            setDrawerOpen(true);
                        }}
                    />
                }
            />

            <TableSearch
                value={search}
                placeholder="Buscar categoria..."
                onChange={setSearch}
            />

            <DataTable
                isEmpty={!loading && filteredCategories.length === 0}
                emptyMessage="Nenhuma categoria encontrada."
                headers={
                    <>
                        <div className="col-span-3">Categoria</div>
                        <div className="col-span-2">Ícone</div>
                        <div className="col-span-5">Descrição</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-1 text-right">Ações</div>
                    </>
                }
            >
                {filteredCategories.map((category) => (
                    <div
                        key={category.id}
                        className="grid gap-5 border-b border-white/10 px-6 py-5 last:border-b-0 lg:grid-cols-12 lg:items-center"
                    >
                        <div className="lg:col-span-3">
                            <p className="font-semibold text-white">
                                {category.name}
                            </p>
                        </div>

                        <div className="lg:col-span-2">
                            <IconBadge icon={category.icon} />
                        </div>

                        <div className="text-zinc-300 lg:col-span-5">
                            {category.description}
                        </div>

                        <div className="lg:col-span-1">
                            <StatusBadge active={category.active} />
                        </div>

                        <div className="lg:col-span-1">
                            <TableActions
                                editLabel={`Editar ${category.name}`}
                                deleteLabel={`Excluir ${category.name}`}
                                onEdit={() => {
                                    setSelectedCategory(category);
                                    setDrawerOpen(true);
                                }}
                                onDelete={() =>
                                    setCategoryToDelete(category.id)
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
                    selectedCategory
                        ? "Editar Categoria"
                        : "Nova Categoria"
                }
                description={
                    selectedCategory
                        ? "Atualize os dados da categoria."
                        : "Cadastre uma nova categoria."
                }
            >
                <CategoryForm
                    key={selectedCategory?.id ?? "new"}
                    category={selectedCategory}
                    onCancel={() => setDrawerOpen(false)}
                    onSave={async (data) => {
                        if (selectedCategory) {
                            await updateCategory(
                                selectedCategory.id,
                                data
                            );
                        } else {
                            await createCategory(data);
                        }

                        setDrawerOpen(false);
                    }}
                />
            </AdminDrawer>

            <ConfirmDialog
                open={categoryToDelete !== null}
                title="Excluir categoria"
                description="Tem certeza que deseja excluir esta categoria?"
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onCancel={() => setCategoryToDelete(null)}
                onConfirm={async () => {
                    if (categoryToDelete !== null) {
                        await deleteCategory(categoryToDelete);
                    }

                    setCategoryToDelete(null);
                }}
            />
        </>
    );
}