import {
    FaClock,
    FaUser,
    FaWhatsapp,
    FaCheckCircle,
} from "react-icons/fa";

import { Modal } from "./Modal";

import { useServices } from "../hooks/useServices";
import { useProfessionals } from "../hooks/useProfessionals";
import { useCategories } from "../hooks/useCategories";

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
    icon = "",
    category,
}: ServiceModalProps) {
    const { services } = useServices();
    const { professionals } = useProfessionals();
    const { categories } = useCategories();

    const selectedCategory = categories.find(
        (item) => item.name === category
    );

    const filteredServices = services
        .filter(
            (service) =>
                service.active &&
                service.categoryId === selectedCategory?.id
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    function normalizeWhatsapp(value: string) {
        return value.replace(/\D/g, "");
    }

    function handleWhatsApp(
        serviceName: string,
        price: number,
        duration: number,
        professionalName: string,
        whatsapp: string
    ) {
        const whatsappNumber = normalizeWhatsapp(whatsapp);

        if (!whatsappNumber) {
            alert("WhatsApp do profissional não cadastrado.");
            return;
        }

        const message = encodeURIComponent(
`Olá, ${professionalName}!

Gostaria de agendar o serviço:

${serviceName}

Valor: R$ ${price.toFixed(2)}
Tempo estimado: ${duration} minutos.

Obrigado!`
        );

        window.open(
            `https://wa.me/${whatsappNumber}?text=${message}`,
            "_blank"
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`${icon ? `${icon} ` : ""}Catálogo de Serviços`}
        >
            <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-400">
                    {title}
                </p>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                    Escolha um serviço e agende diretamente pelo WhatsApp.
                </p>
            </div>

            {filteredServices.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-400">
                    Nenhum serviço cadastrado.
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {filteredServices.map((service) => {
                        const professional = professionals.find(
                            (item) => item.id === service.professionalId
                        );

                        if (!professional) {
                            return null;
                        }

                        return (
                            <article
                                key={service.id}
                                className="flex flex-col rounded-2xl border border-white/10 bg-zinc-900/80 p-5 transition hover:border-amber-500/40"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <FaCheckCircle className="shrink-0 text-amber-400" />

                                            <h3 className="text-lg font-bold text-white">
                                                {service.name}
                                            </h3>
                                        </div>

                                        <p className="mt-3 text-sm leading-6 text-zinc-400">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="shrink-0 rounded-2xl bg-amber-500/10 px-4 py-3 text-right">
                                        <span className="block text-xs font-bold text-amber-400">
                                            R$
                                        </span>

                                        <strong className="text-xl text-amber-400">
                                            {service.price.toFixed(2)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-zinc-400">
                                    <span className="flex items-center gap-2">
                                        <FaClock className="text-amber-400" />
                                        {service.duration} min
                                    </span>

                                    <span className="flex items-center gap-2">
                                        <FaUser className="text-amber-400" />
                                        {professional.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleWhatsApp(
                                            service.name,
                                            service.price,
                                            service.duration,
                                            professional.name,
                                            professional.whatsapp
                                        )
                                    }
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500 active:scale-95"
                                >
                                    <FaWhatsapp />
                                    Agendar
                                </button>
                            </article>
                        );
                    })}
                </div>
            )}
        </Modal>
    );
}