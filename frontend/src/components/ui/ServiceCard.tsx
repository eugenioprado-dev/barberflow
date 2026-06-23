import type { ReactNode } from "react";

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export function ServiceCard({
    icon,
    title,
    description,
}: ServiceCardProps) {
    return (
        <div
            className="
        rounded-3xl
        border
        border-zinc-800
        bg-gradient-to-b
        from-zinc-900
        to-zinc-950
        p-8
        shadow-xl
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-amber-400
        hover:shadow-amber-500/20"
        >
            <div className="text-5xl text-amber-500">
                {icon}
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-white">
                {title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
                {description}
            </p>

            <button
                className="
            mt-8
            flex
            items-center
            gap-2
            font-semibold
            text-amber-500
            transition-all
            hover:translate-x-2
            hover:text-amber-400
        "
            >
                Saiba mais →
            </button>
        </div>
    );
}