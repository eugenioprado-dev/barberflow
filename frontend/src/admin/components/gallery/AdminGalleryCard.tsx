import { FaEdit, FaImage, FaTrash } from "react-icons/fa";

import { StatusBadge } from "../table/StatusBadge";

interface AdminGalleryCardProps {
    title: string;
    description: string;
    image: string;
    imagesCount?: number;
    active: boolean;
    professionalName: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function AdminGalleryCard({
    title,
    description,
    image,
    imagesCount = 0,
    active,
    professionalName,
    onEdit,
    onDelete,
}: AdminGalleryCardProps) {
    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 transition hover:border-amber-500/30">
            <div className="relative flex h-48 items-center justify-center bg-zinc-900">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3 text-zinc-500">
                        <span className="text-4xl">
                            <FaImage />
                        </span>

                        <span className="text-sm">
                            Sem imagem
                        </span>
                    </div>
                )}

                {imagesCount > 0 && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        📸 {imagesCount} {imagesCount === 1 ? "foto" : "fotos"}
                    </div>
                )}
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h3 className="font-semibold text-white">
                        {title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                            Profissional
                        </p>

                        <p className="text-sm font-medium text-zinc-300">
                            {professionalName}
                        </p>
                    </div>

                    <StatusBadge active={active} />
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onEdit}
                        aria-label={`Editar ${title}`}
                        className="flex flex-1 items-center justify-center rounded-xl border border-white/10 py-3 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-400"
                    >
                        <FaEdit />
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        aria-label={`Excluir ${title}`}
                        className="flex flex-1 items-center justify-center rounded-xl border border-white/10 py-3 text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
}