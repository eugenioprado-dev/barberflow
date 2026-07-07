import type { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: ReactNode;
    badge?: string;
}

export function StatCard({
    title,
    value,
    description,
    icon,
    badge = "Ativo",
}: StatCardProps) {
    return (
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-xl transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-amber-500/10">
            <div className="flex items-center justify-between gap-4">
                <div className="rounded-2xl bg-amber-500/10 p-4 text-2xl text-amber-400">
                    {icon}
                </div>

                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-400">
                    {badge}
                </span>
            </div>

            <h3 className="mt-6 text-4xl font-bold text-white">
                {value}
            </h3>

            <p className="mt-2 font-medium text-zinc-300">
                {title}
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
            </p>
        </div>
    );
}