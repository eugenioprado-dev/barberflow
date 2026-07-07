import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";

import type { Gallery } from "../../../models/Gallery";
import type { Professional } from "../../../models/Professional";

interface Props {
    open: boolean;
    gallery: Gallery[];
    professionals: Professional[];
    onClose: () => void;
    onPreview: (item: Gallery) => void;
    onEdit: (item: Gallery) => void;
    onDelete: (id: number) => void;
}

export function AdminGalleryMobileModal({
    open,
    gallery,
    professionals,
    onClose,
    onPreview,
    onEdit,
    onDelete,
}: Props) {
    if (!open) return null;

    function getProfessionalName(id: number | null) {
        return (
            professionals.find((professional) => professional.id === id)
                ?.name ?? "Profissional"
        );
    }

    return (
        <div className="fixed inset-0 z-[99999] bg-black text-white">
            <header className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
                        Galeria
                    </p>

                    <h2 className="text-2xl font-bold">
                        Portfólio do painel
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fechar galeria"
                    className="rounded-full bg-white/10 p-3"
                >
                    <FaTimes />
                </button>
            </header>

            <main className="h-[calc(100dvh-88px)] overflow-y-auto p-5">
                <div className="grid gap-5">
                    {gallery.map((item) => {
                        const allImages = [
                            item.image,
                            ...item.images,
                        ].filter(Boolean);

                        return (
                            <article
                                key={item.id}
                                onClick={() => onPreview(item)}
                                className="cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition hover:border-amber-500/40"
                            >
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold">
                                        📸 {allImages.length}
                                    </div>

                                    <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                                        Toque para visualizar
                                    </div>
                                </div>

                                {allImages.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-black/30 p-3">
                                        {allImages.map((image, index) => (
                                            <img
                                                key={`${image}-${index}`}
                                                src={image}
                                                alt={`Foto ${index + 1} de ${item.title}`}
                                                className="h-20 w-20 shrink-0 rounded-xl object-cover"
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-4 p-5">
                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-400">
                                            {getProfessionalName(
                                                item.professionalId
                                            )}
                                        </p>
                                    </div>

                                    <p className="line-clamp-2 text-sm leading-6 text-zinc-500">
                                        {item.description}
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onEdit(item);
                                            }}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-amber-400"
                                        >
                                            <FaEdit />
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onDelete(item.id);
                                            }}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-red-400"
                                        >
                                            <FaTrash />
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}