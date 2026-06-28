import { useState } from "react";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaWhatsapp,
    FaSearch,
} from "react-icons/fa";

import { professionals } from "../../data";

export function Professionals() {
    const [search, setSearch] = useState("");

    const filteredProfessionals = professionals.filter((professional) =>
        professional.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    ).length;

    return (
        <div>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Profissionais
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        {activeProfessionals} profissionais ativos no site.
                    </p>
                </div>

                <button className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400">
                    <FaPlus />
                    Novo Profissional
                </button>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3">
                <FaSearch className="text-zinc-500" />

                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar profissional..."
                    className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                />
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70">
                <div className="hidden grid-cols-12 border-b border-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 lg:grid">
                    <div className="col-span-5">
                        Profissional
                    </div>

                    <div className="col-span-3">
                        Especialidade
                    </div>

                    <div className="col-span-2">
                        Status
                    </div>

                    <div className="col-span-2 text-right">
                        Ações
                    </div>
                </div>

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
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    professional.active
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-red-500/10 text-red-400"
                                }`}
                            >
                                {professional.active ? "Ativo" : "Inativo"}
                            </span>
                        </div>

                        <div className="flex gap-2 lg:col-span-2 lg:justify-end">
                            <button
                                type="button"
                                aria-label={`Editar ${professional.name}`}
                                className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-400"
                            >
                                <FaEdit />
                            </button>

                            <button
                                type="button"
                                aria-label={`Excluir ${professional.name}`}
                                className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:border-red-500/40 hover:text-red-400"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredProfessionals.length === 0 && (
                    <div className="px-6 py-10 text-center text-zinc-500">
                        Nenhum profissional encontrado.
                    </div>
                )}
            </div>
        </div>
    );
}