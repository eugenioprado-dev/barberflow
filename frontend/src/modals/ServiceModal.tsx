import {
    FaClock,
    FaUser,
    FaWhatsapp,
    FaCheckCircle,
} from "react-icons/fa";

import { Modal } from "./Modal";

import { servicesStore } from "../store/servicesStore";
import { professionalsStore } from "../store/professionalsStore";

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
    const services = servicesStore.getByCategory(category);

    function handleWhatsApp(
        serviceName: string,
        price: number,
        duration: number,
        professionalName: string,
        whatsapp: string
    ) {
        const message = encodeURIComponent(
`Olá, ${professionalName}!

Gostaria de agendar o serviço:

${serviceName}

Valor: R$ ${price.toFixed(2)}
Tempo estimado: ${duration} minutos.

Obrigado!`
        );

        window.open(
            `https://wa.me/${whatsapp}?text=${message}`,
            "_blank"
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`${icon ? `${icon} ` : ""}Catálogo de Serviços`}
        >
            <div className="mb-6 border-b border-white/10 pb-4">
                <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
                    {title}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Escolha um serviço abaixo e agende diretamente pelo WhatsApp.
                </p>
            </div>

            {services.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-400">
                    Nenhum serviço cadastrado.
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {services.map((service) => {
                        const professional =
                            professionalsStore.getById(
                                service.professionalId
                            );

                        if (!professional) {
                            return null;
                        }

                        return (
                            <div
                                key={service.id}
                                className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 transition hover:border-amber-500/40 hover:bg-zinc-900"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-amber-400">
                                                <FaCheckCircle />
                                            </span>

                                            <h3 className="text-lg font-bold text-white">
                                                {service.name}
                                            </h3>
                                        </div>

                                        {service.description && (
                                            <p className="mt-3 text-sm leading-6 text-zinc-400">
                                                {service.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="shrink-0 rounded-2xl bg-amber-500/10 px-4 py-3 text-right">
                                        <p className="text-xs font-bold text-amber-400">
                                            R$
                                        </p>

                                        <p className="text-xl font-bold text-amber-400">
                                            {service.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                                        <span className="flex items-center gap-2">
                                            <span className="text-amber-400">
                                                <FaClock />
                                            </span>
                                            {service.duration} min
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <span className="text-amber-400">
                                                <FaUser />
                                            </span>
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
                                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-500 active:scale-95"
                                    >
                                        <FaWhatsapp />
                                        Agendar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </Modal>
    );
}