import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

import type { Gallery } from "../../models/Gallery";
import type { Professional } from "../../models/Professional";

interface PortfolioModalProps {
    open: boolean;
    gallery: Gallery[];
    professionals: Professional[];
    onClose: () => void;
    onSelect: (item: Gallery) => void;
}

export function PortfolioModal({
    open,
    gallery,
    professionals,
    onClose,
    onSelect,
}: PortfolioModalProps) {
    const [search, setSearch] = useState("");
    const [professionalId, setProfessionalId] = useState<number | null>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (open) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    );

    const filteredGallery = gallery.filter((item) => {
        const matchesSearch = item.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesProfessional =
            professionalId === null ||
            item.professionalId === professionalId;

        return matchesSearch && matchesProfessional;
    });

    function getProfessionalName(id: number | null) {
        return (
            professionals.find((professional) => professional.id === id)
                ?.name ?? "André Dias Studio"
        );
    }

    return (
        <div className="fixed inset-0 z-[99998] bg-black text-white">
            <div className="flex h-full flex-col">
                <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
                            Portfólio completo
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            Todos os trabalhos
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            {filteredGallery.length} trabalho
                            {filteredGallery.length !== 1 && "s"} encontrado
                            {filteredGallery.length !== 1 && "s"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                        aria-label="Fechar portfólio"
                    >
                        <FaTimes />
                    </button>
                </header>

                <div className="space-y-4 border-b border-white/10 p-5">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">
                        <FaSearch className="text-zinc-500" />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Buscar trabalho..."
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto pb-1">
                        <button
                            type="button"
                            onClick={() => setProfessionalId(null)}
                            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${professionalId === null
                                ? "bg-amber-500 text-black"
                                : "bg-zinc-900 text-zinc-400 hover:text-white"
                                }`}
                        >
                            Todos
                        </button>

                        {activeProfessionals.map((professional) => (
                            <button
                                key={professional.id}
                                type="button"
                                onClick={() =>
                                    setProfessionalId(professional.id)
                                }
                                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${professionalId === professional.id
                                    ? "bg-amber-500 text-black"
                                    : "bg-zinc-900 text-zinc-400 hover:text-white"
                                    }`}
                            >
                                {professional.name}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="min-h-0 flex-1 overflow-y-auto p-5">
                    {filteredGallery.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center text-zinc-400">
                            Nenhum trabalho encontrado.
                        </div>
                    ) : (
                        <div className="grid justify-center gap-8 sm:grid-cols-2 xl:grid-cols-3">
                            {filteredGallery.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => onSelect(item)}
                                    className="
                                        group
                                        mx-auto
                                        w-full
                                        max-w-sm
                                        overflow-hidden
                                        rounded-3xl
                                        border
                                        border-white/10
                                        bg-zinc-900
                                        text-left
                                        transition
                                        hover:border-amber-500/50
                                        "
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
                                                {getProfessionalName(
                                                    item.professionalId
                                                )}
                                            </p>

                                            <h3 className="mt-2 text-xl font-bold">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <p className="line-clamp-2 text-sm leading-6 text-zinc-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}