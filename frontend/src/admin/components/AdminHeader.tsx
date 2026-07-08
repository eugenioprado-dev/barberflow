import { FaBars, FaShieldAlt } from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useSite } from "../../hooks/useSite";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const { user } = useAuth();
    const { site } = useSite();

    const businessName = site?.business.name ?? "André Dias Studio";

    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Abrir menu administrativo"
                        className="shrink-0 rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-400 lg:hidden"
                    >
                        <FaBars />
                    </button>

                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold sm:text-xl">
                            Painel Administrativo
                        </h2>

                        <p className="mt-1 hidden truncate text-sm text-zinc-500 sm:block">
                            Gerencie informações do {businessName}.
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-400 sm:px-4 sm:text-sm">
                    <FaShieldAlt className="text-amber-400" />

                    <span className="hidden max-w-48 truncate sm:inline">
                        {user?.email ?? "Admin"}
                    </span>

                    <span className="sm:hidden">Admin</span>
                </div>
            </div>
        </header>
    );
}