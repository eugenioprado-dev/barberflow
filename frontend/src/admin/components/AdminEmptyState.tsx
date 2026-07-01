import type { ReactNode } from "react";

interface AdminEmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
}

export function AdminEmptyState({
    icon,
    title,
    description,
}: AdminEmptyStateProps) {
    return (
        <div className="rounded-3xl border border-dashed border-white/10 bg-zinc-900/60 px-8 py-14 text-center">
            {icon && (
                <div className="mb-5 flex justify-center text-5xl text-zinc-500">
                    {icon}
                </div>
            )}

            <h3 className="text-lg font-semibold text-white">
                {title}
            </h3>

            {description && (
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                    {description}
                </p>
            )}
        </div>
    );
}