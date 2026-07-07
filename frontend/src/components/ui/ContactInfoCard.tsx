import type { ReactNode } from "react";

interface ContactInfoCardProps {
    icon: ReactNode;
    title: string;
    value: string;
}

export function ContactInfoCard({
    icon,
    title,
    value,
}: ContactInfoCardProps) {
    return (
        <div
            className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        transition-all
        duration-300
        hover:border-amber-500
        hover:-translate-y-1"
        >
            <div className="mb-4 text-3xl text-amber-500">
                {icon}
            </div>

            <h3 className="whitespace-pre-line text-lg font-semibold text-white">
                {title}
            </h3>

            <p className="mt-2 text-zinc-400">
                {value}
            </p>
        </div>
    );
}