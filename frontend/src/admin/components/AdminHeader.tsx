export function AdminHeader() {
    return (
        <header className="border-b border-white/10 bg-black/40 px-6 py-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold">
                        Painel Administrativo
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Gerencie informações do André Dias Studio.
                    </p>
                </div>

                <div className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 sm:block">
                    Admin
                </div>
            </div>
        </header>
    );
}