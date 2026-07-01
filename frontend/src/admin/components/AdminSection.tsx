import type { ReactNode } from "react";

interface AdminSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export function AdminSection({
    title,
    description,
    children,
}: AdminSectionProps) {
    return (
        <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                    {title}
                </h2>

                {description && (
                    <p className="mt-2 text-sm text-zinc-500">
                        {description}
                    </p>
                )}
            </div>

            {children}
        </section>
    );
}