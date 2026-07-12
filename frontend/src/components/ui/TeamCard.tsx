import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import toast from "react-hot-toast";

import { openWhatsapp } from "../../utils/whatsapp";

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    instagram: string;
    whatsapp: string;
}

export function TeamCard({
    name,
    role,
    image,
    instagram,
    whatsapp,
}: TeamCardProps) {
    function handleSchedule() {
        const opened = openWhatsapp(
            whatsapp,
            `Olá, ${name}! Gostaria de agendar um horário.`
        );

        if (!opened) {
            toast.error("WhatsApp do profissional não cadastrado.");
        }
    }

    const instagramUrl = instagram.startsWith("http")
        ? instagram
        : `https://instagram.com/${instagram.replace("@", "")}`;

    return (
        <div className="group h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-500 hover:border-amber-500 lg:hover:-translate-y-3">
            <div className="relative h-[420px] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                        <span className="text-8xl">👤</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white">
                        {name}
                    </h3>

                    <p className="mt-2 text-amber-400">
                        {role}
                    </p>
                </div>
            </div>

            <div className="flex gap-4 p-6">
                <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl border border-zinc-700 py-3 text-center font-semibold text-white transition hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                >
                    <span className="flex items-center justify-center gap-2">
                        <FaInstagram />
                        Instagram
                    </span>
                </a>

                <button
                    type="button"
                    onClick={handleSchedule}
                    className="flex-1 rounded-xl bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-400"
                >
                    <span className="flex items-center justify-center gap-2">
                        <FiCalendar />
                        <FaWhatsapp />
                        Agendar
                    </span>
                </button>
            </div>
        </div>
    );
}