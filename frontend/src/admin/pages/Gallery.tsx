import { useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { TableSearch } from "../components/table/TableSearch";
import { AdminDrawer } from "../components/AdminDrawer";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AdminGalleryCard } from "../components/gallery/AdminGalleryCard";
import { GalleryForm } from "../components/GalleryForm";

import { useGallery } from "../../hooks/useGallery";
import { useProfessionals } from "../../hooks/useProfessionals";

import { storageService } from "../../services/storageService";

import type { Gallery as GalleryModel } from "../../models/Gallery";

import { FaPlus } from "react-icons/fa";

export function Gallery() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedGallery, setSelectedGallery] =
        useState<GalleryModel>();
    const [galleryToDelete, setGalleryToDelete] =
        useState<number | null>(null);

    const {
        gallery,
        createGallery,
        updateGallery,
        deleteGallery,
    } = useGallery();

    const { professionals } = useProfessionals();

    const filteredGallery = gallery.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const activeImages = gallery.filter((item) => item.active).length;

    return (
        <>
            <PageHeader
                title="Galeria"
                description={`${activeImages} trabalhos ativos.`}
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
                        Novo Trabalho
                    </button>
                }
            />

            <TableSearch
                value={search}
                placeholder="Buscar trabalho..."
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
                    selectedGallery
                        ? "Editar Trabalho"
                        : "Novo Trabalho"
                }
                description={
                    selectedGallery
                        ? "Atualize os dados do trabalho."
                        : "Cadastre um novo trabalho para a galeria."
                }
            >
                <GalleryForm
                    galleryItem={selectedGallery}
                    onCancel={() => setDrawerOpen(false)}
                    onSave={async (data) => {
                        let coverUrl = selectedGallery?.image ?? "";

                        if (data.image) {
                            coverUrl = await storageService.upload(
                                data.image,
                                "gallery"
                            );
                        }

                        let imagesUrls =
                            selectedGallery?.images ?? [];

                        if (data.images.length > 0) {
                            imagesUrls = await Promise.all(
                                data.images.map((file) =>
                                    storageService.upload(
                                        file,
                                        "gallery"
                                    )
                                )
                            );
                        }

                        const payload = {
                            title: data.title,
                            description: data.description,
                            image: coverUrl,
                            images: imagesUrls,
                            professionalId: data.professionalId,
                            active: data.active,
                        };

                        if (selectedGallery) {
                            await updateGallery(
                                selectedGallery.id,
                                payload
                            );
                        } else {
                            await createGallery(payload);
                        }

                        setDrawerOpen(false);
                    }}
                />
            </AdminDrawer>

            <ConfirmDialog
                open={galleryToDelete !== null}
                title="Excluir trabalho"
                description="Tem certeza que deseja excluir este trabalho?"
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onCancel={() => setGalleryToDelete(null)}
                onConfirm={async () => {
                    if (galleryToDelete !== null) {
                        await deleteGallery(galleryToDelete);
                    }

                    setGalleryToDelete(null);
                }}
            />
        </>
    );
}