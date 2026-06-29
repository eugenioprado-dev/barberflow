import type { ReactNode } from "react";

interface DataTableProps {
    headers: ReactNode;
    children: ReactNode;
    emptyMessage?: string;
    isEmpty?: boolean;
}

export function DataTable({
    headers,
    children,
    emptyMessage = "Nenhum registro encontrado.",
    isEmpty = false,
}: DataTableProps) {
    return (
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70">
            <div className="hidden grid-cols-12 border-b border-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-zinc-500 lg:grid">
                {headers}
            </div>

            {isEmpty ? (
                <div className="px-6 py-10 text-center text-zinc-500">
                    {emptyMessage}
                </div>
            ) : (
                children
            )}
        </div>
    );
}