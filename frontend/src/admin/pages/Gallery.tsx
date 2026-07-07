import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { PageHeader } from "../components/PageHeader";
import { TableSearch } from "../components/table/TableSearch";
import { AdminDrawer } from "../components/AdminDrawer";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AdminGalleryCard } from "../components/gallery/AdminGalleryCard";
import { AdminGalleryMobileModal } from "../components/gallery/AdminGalleryMobileModal";
import { GalleryForm } from "../components/GalleryForm";

import { GalleryModal } from "../../components/modals/GalleryModal";

import { useGallery } from "../../hooks/useGallery";
import { useProfessionals } from "../../hooks/useProfessionals";

import { storageService } from "../../services/storageService";

import type { Gallery as GalleryModel } from "../../models/Gallery";

export function Gallery() {
    const [search, setSearch] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [mobileModalOpen, setMobileModalOpen] = useState(false);

    const [selectedGallery, setSelectedGallery] =
        useState<GalleryModel>();

    const [previewGallery, setPreviewGallery] =
        useState<GalleryModel | null>(null);

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

    function closeDrawer() {
        setDrawerOpen(false);
        setSelectedGallery(undefined);
    }

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

            <div className="mt-6 md:hidden">
                <button
                    type="button"
                    onClick={() => setMobileModalOpen(true)}
                    className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-5 py-4 font-semibold text-white transition hover:border-amber-500"
                >
                    Abrir portfólio do painel
                </button>
            </div>

            <div className="mt-8 hidden gap-8 md:grid md:grid-cols-2 2xl:grid-cols-3">
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
                onClose={closeDrawer}
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
                    key={selectedGallery?.id ?? "new"}
                    galleryItem={selectedGallery}
                    onCancel={closeDrawer}
                    onSave={async (data) => {
                        let coverUrl = selectedGallery?.image ?? "";

                        if (data.image) {
                            coverUrl = await storageService.upload(
                                data.image,
                                "gallery"
                            );
                        }

                        let imagesUrls = selectedGallery?.images ?? [];

                        if (data.images.length > 0) {
                            const newImagesUrls = await Promise.all(
                                data.images.map((file) =>
                                    storageService.upload(file, "gallery")
                                )
                            );

                            imagesUrls = [
                                ...imagesUrls,
                                ...newImagesUrls,
                            ];
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

                        closeDrawer();
                    }}
                />
            </AdminDrawer>

            <AdminGalleryMobileModal
                open={mobileModalOpen}
                gallery={filteredGallery}
                professionals={professionals}
                onClose={() => setMobileModalOpen(false)}
                onPreview={(item) => setPreviewGallery(item)}
                onEdit={(item) => {
                    setSelectedGallery(item);
                    setDrawerOpen(true);
                    setMobileModalOpen(false);
                }}
                onDelete={(id) => {
                    setGalleryToDelete(id);
                    setMobileModalOpen(false);
                }}
            />

            <GalleryModal
                key={previewGallery?.id ?? "admin-preview-closed"}
                item={previewGallery}
                onClose={() => setPreviewGallery(null)}
            />

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