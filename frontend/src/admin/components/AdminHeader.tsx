import { FaBars } from "react-icons/fa";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    return (
        <header className="border-b border-white/10 bg-black/40 px-6 py-5 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Abrir menu administrativo"
                        className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-400 lg:hidden"
                    >
                        <FaBars />
                    </button>

                    <div>
                        <h2 className="text-xl font-semibold">
                            Painel Administrativo
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Gerencie informações do André Dias Studio.
                        </p>
                    </div>
                </div>

                <div className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 sm:block">
                    Admin
                </div>
            </div>
        </header>
    );
}