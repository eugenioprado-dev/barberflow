import type { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface AdminDrawerProps {
    open: boolean;
    title: string;
    description?: string;
    children: ReactNode;
    onClose: () => void;
}

export function AdminDrawer({
    open,
    title,
    description,
    children,
    onClose,
}: AdminDrawerProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[999]">
            {/* Overlay */}
            <button
                type="button"
                aria-label="Fechar"
                onClick={onClose}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Drawer */}
            <aside
                className="
                    absolute
                    right-0
                    top-0
                    flex
                    h-full
                    w-full
                    max-w-xl
                    flex-col
                    border-l
                    border-white/10
                    bg-zinc-950
                    shadow-2xl
                "
            >
                {/* Cabeçalho */}
                <div className="flex items-start justify-between border-b border-white/10 p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {title}
                        </h2>

                        {description && (
                            <p className="mt-2 text-sm text-zinc-400">
                                {description}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        aria-label="Fechar drawer"
                        onClick={onClose}
                        className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:border-amber-500 hover:text-amber-400"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </aside>
        </div>
    );
}