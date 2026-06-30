import { useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { TableSearch } from "../components/table/TableSearch";
import { AdminDrawer } from "../components/AdminDrawer";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AdminGalleryCard } from "../components/gallery/AdminGalleryCard";
import { GalleryForm } from "../components/GalleryForm";

import { useGallery } from "../hooks/useGallery";

import { professionals } from "../../data/professionals";

import type { Gallery } from "../../models/Gallery";

import { FaPlus } from "react-icons/fa";

export function Gallery() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedGallery, setSelectedGallery] =
        useState<Gallery>();
    const [galleryToDelete, setGalleryToDelete] =
        useState<number | null>(null);

    const {
        gallery,
        createGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
    } = useGallery();

    const filteredGallery = gallery.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const activeImages = gallery.filter((item) => item.active).length;

    return (
        <>
            <PageHeader
                title="Galeria"
                description={`${activeImages} imagens ativas.`}
                action={
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedGallery(undefined);
                            setDrawerOpen(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
                    >
                        <FaPlus />
                        Nova Imagem
                    </button>
                }
            />

            <TableSearch
                value={search}
                placeholder="Buscar imagem..."
                onChange={setSearch}
            />

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredGallery.map((item) => {
                    const professional = professionals.find(
                        (p) => p.id === item.professionalId
                    );

                    return (
                        <AdminGalleryCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            imagesCount={item.images.length}
                            active={item.active}
                            professionalName={
                                professional?.name ?? "Profissional"
                            }
                            onEdit={() => {
                                setSelectedGallery(item);
                                setDrawerOpen(true);
                            }}
                            onDelete={() =>
                                setGalleryToDelete(item.id)
                            }
                        />
                    );
                })}
            </div>

            <AdminDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={
                    selectedGallery ? "Editar Imagem" : "Nova Imagem"
                }
                description={
                    selectedGallery
                        ? "Atualize os dados da imagem."
                        : "Cadastre uma nova imagem."
                }
            >
                <GalleryForm
                    galleryItem={selectedGallery}
                    onCancel={() => setDrawerOpen(false)}
                    onSave={(data) => {
                        if (selectedGallery) {
                            updateGalleryItem(selectedGallery.id, data);
                        } else {
                            createGalleryItem(data);
                        }

                        setDrawerOpen(false);
                    }}
                />
            </AdminDrawer>

            <ConfirmDialog
                open={galleryToDelete !== null}
                title="Excluir imagem"
                description="Tem certeza que deseja excluir esta imagem?"
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onCancel={() => setGalleryToDelete(null)}
                onConfirm={() => {
                    if (galleryToDelete !== null) {
                        deleteGalleryItem(galleryToDelete);
                    }

                    setGalleryToDelete(null);
                }}
            />
        </>
    );
}