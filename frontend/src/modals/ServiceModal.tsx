import { useEffect, useMemo, useState } from "react";
import {
    FaClock,
    FaSearch,
    FaTimes,
    FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useServices } from "../hooks/useServices";
import { useCategories } from "../hooks/useCategories";
import { useProfessionals } from "../hooks/useProfessionals";
import { useSite } from "../hooks/useSite";

interface ServiceModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    icon?: string;
    category: string;
}

export function ServiceModal({
    open,
    onClose,
    title,
    category,
}: ServiceModalProps) {
    const [search, setSearch] = useState("");

    const { services } = useServices();
    const { categories } = useCategories();
    const { professionals } = useProfessionals();
    const { site } = useSite();

    useEffect(() => {
        if (!open) return;

        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            setSearch("");
        }
    }, [open]);

    const selectedCategory = categories.find(
        (item) => item.name === category
    );

    const categoryServices = services.filter(
        (service) =>
            service.active &&
            service.categoryId === selectedCategory?.id
    );

    const filteredServices = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return categoryServices;
        }

        return categoryServices.filter((service) => {
            const professional = professionals.find(
                (item) => item.id === service.professionalId
            );

            return (
                service.name.toLowerCase().includes(normalizedSearch) ||
                service.description
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                professional?.name
                    .toLowerCase()
                    .includes(normalizedSearch)
            );
        });
    }, [categoryServices, professionals, search]);

    function formatPrice(price: number) {
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function getProfessionalName(professionalId: number) {
        return (
            professionals.find((item) => item.id === professionalId)
                ?.name ?? "Profissional"
        );
    }

    function handleSchedule(serviceName: string, professionalId: number) {
        const professional = professionals.find(
            (item) => item.id === professionalId
        );

        const whatsapp =
            professional?.whatsapp || site?.business.whatsapp || "";

        const whatsappNumber = whatsapp.replace(/\D/g, "");

        if (!whatsappNumber) {
            toast.error("WhatsApp não cadastrado para agendamento.");
            return;
        }

        const message = encodeURIComponent(
            `Olá! Gostaria de agendar o serviço: ${serviceName}.`
        );

        window.open(
            `https://wa.me/${whatsappNumber}?text=${message}`,
            "_blank"
        );
    }

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm">
            <button
                type="button"
                aria-label="Fechar modal"
                onClick={onClose}
                className="absolute inset-0"
            />

            <div className="relative z-10 flex max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-white shadow-2xl">
                <header className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                            Serviços
                        </p>

                        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                            {title}
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Escolha o serviço desejado para agendar.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-400"
                    >
                        <FaTimes />
                    </button>
                </header>

                <div className="border-b border-white/10 p-5 sm:p-6">
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 transition focus-within:border-amber-500/60">
                        <FaSearch className="shrink-0 text-zinc-500" />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Procurar corte, barba, manicure..."
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 sm:text-base"
                        />
                    </label>
                </div>

                <div className="overflow-y-auto p-5 sm:p-6">
                    {filteredServices.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 text-center">
                            <p className="font-semibold text-white">
                                Nenhum serviço encontrado
                            </p>

                            <p className="mt-2 text-sm text-zinc-500">
                                Tente buscar por outro nome, como corte,
                                barba, manicure ou depilação.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredServices.map((service) => (
                                <article
                                    key={service.id}
                                    className="rounded-3xl border border-white/10 bg-zinc-900/70 p-5 transition hover:border-amber-500/40"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">
                                                {service.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-amber-400">
                                                {getProfessionalName(
                                                    service.professionalId
                                                )}
                                            </p>
                                        </div>

                                        <span className="shrink-0 rounded-full bg-amber-500 px-3 py-1 text-sm font-bold text-black">
                                            {formatPrice(service.price)}
                                        </span>
                                    </div>

                                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">
                                        {service.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between gap-4">
                                        <span className="flex items-center gap-2 text-sm text-zinc-500">
                                            <FaClock />
                                            {service.duration} min
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSchedule(
                                                    service.name,
                                                    service.professionalId
                                                )
                                            }
                                            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
                                        >
                                            <FaWhatsapp />
                                            Agendar
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}