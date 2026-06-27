import { FaClock, FaUser, FaWhatsapp } from "react-icons/fa";
import { Modal } from "./Modal";

interface Service {
    name: string;
    price: number;
    duration: number;
    professional: string;
    whatsapp: string;
}

interface ServiceModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    icon: string;
    services: Service[];
}

export function ServiceModal({
    open,
    onClose,
    title,
    icon,
    services,
}: ServiceModalProps) {
    function handleWhatsApp(service: Service) {
        const message = encodeURIComponent(
`Olá, ${service.professional}!

Gostaria de agendar o serviço:

${service.name}

Valor: R$ ${service.price.toFixed(2)}
Tempo estimado: ${service.duration} minutos.

Obrigado!`
        );

        window.open(
            `https://wa.me/${service.whatsapp}?text=${message}`,
            "_blank"
        );
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`${icon} ${title}`}
        >
            {services.length === 0 ? (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-400">
                    Nenhum serviço cadastrado.
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-zinc-800">

                    {/* Cabeçalho */}
                    <div className="grid grid-cols-12 bg-zinc-900 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">

                        <div className="col-span-5">
                            Serviço
                        </div>

                        <div className="col-span-2 text-center">
                            Valor
                        </div>

                        <div className="col-span-2 text-center">
                            Tempo
                        </div>

                        <div className="col-span-3 text-center">
                            Agendar
                        </div>

                    </div>

                    {services.map((service, index) => (

                        <div
                            key={index}
                            className="
                                grid
                                grid-cols-12
                                items-center
                                border-t
                                border-zinc-800
                                px-6
                                py-5
                                transition
                                hover:bg-zinc-900/70
                            "
                        >

                            <div className="col-span-5">

                                <p className="font-semibold text-white">
                                    {service.name}
                                </p>

                                <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                                    <FaUser size={12} />
                                    {service.professional}
                                </div>

                            </div>

                            <div className="col-span-2 text-center font-bold text-amber-400">
                                R$ {service.price.toFixed(2)}
                            </div>

                            <div className="col-span-2">

                                <div className="flex items-center justify-center gap-2 text-zinc-300">
                                    <FaClock />
                                    {service.duration} min
                                </div>

                            </div>

                            <div className="col-span-3 flex justify-center">

                                <button
                                    onClick={() => handleWhatsApp(service)}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        bg-green-600
                                        px-4
                                        py-2
                                        font-medium
                                        text-white
                                        transition
                                        hover:bg-green-500
                                    "
                                >
                                    <FaWhatsapp />
                                    WhatsApp
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}
        </Modal>
    );
}