import { FaClock, FaWhatsapp } from "react-icons/fa";
import { Modal } from "./Modal";

interface Service {
    name: string;
    price: string;
    duration: string;
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
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={`${icon} ${title}`}
        >
            <div className="space-y-4">

                {services.map((service, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-amber-500"
                    >
                        <div className="flex items-center justify-between">

                            <div>
                                <h3 className="font-semibold text-white">
                                    {service.name}
                                </h3>

                                <div className="mt-2 flex items-center gap-4 text-sm text-zinc-400">

                                    <span className="font-semibold text-amber-400">
                                        {service.price}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <FaClock />
                                        {service.duration}
                                    </span>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                <button
                    aria-label="Agendar pelo WhatsApp"
                    className="
                        mt-6
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-xl
                        bg-amber-500
                        px-6
                        py-4
                        font-semibold
                        text-black
                        transition
                        hover:bg-amber-400
                    "
                >
                    <FaWhatsapp size={20} />

                    Agendar pelo WhatsApp
                </button>

            </div>
        </Modal>
    );
}