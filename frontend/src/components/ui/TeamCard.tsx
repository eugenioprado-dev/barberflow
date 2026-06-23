import { FaInstagram } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

interface TeamCardProps {
    name: string;
    role: string;
    image: string;
    instagram: string;
}

export function TeamCard({
    name,
    role,
    image,
    instagram,
}: TeamCardProps) {
    return (
        <div
            className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        shadow-2xl
        transition-all
        duration-500
        hover:-translate-y-3
        hover:border-amber-500"
        >
            <div className="relative h-[420px] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-zinc-800">
                        <span className="text-8xl">👤</span>
                    </div>
                )}

                {/* Gradiente */}
                <div
                    className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/40
            to-transparent
            "
                />

                {/* Nome sobre a imagem */}
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
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="
            flex-1
            rounded-xl
            border
            border-zinc-700
            py-3
            text-center
            font-semibold
            text-white
            transition
            hover:border-amber-500
            hover:bg-amber-500
            hover:text-black
            "
                >
                    <span className="flex items-center justify-center gap-2">
                        <FaInstagram />
                        Instagram
                    </span>
                </a>

                <button
                    className="
            flex-1
            rounded-xl
            bg-amber-500
            py-3
            font-semibold
            text-black
            transition
            hover:bg-amber-400
            "
                >
                    <span className="flex items-center justify-center gap-2">
                        <FiCalendar />
                        Agendar
                    </span>
                </button>
            </div>
        </div>
    );
}