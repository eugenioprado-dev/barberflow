interface AdminLoadingProps {
    title?: string;
    description?: string;
}

export function AdminLoading({
    title = "Carregando dados...",
    description = "Buscando informações no sistema.",
}: AdminLoadingProps) {
    return (
        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900/60 p-8">
            <div className="animate-pulse space-y-6">
                <div>
                    <div className="h-5 w-48 rounded-full bg-white/10" />
                    <div className="mt-3 h-4 w-72 rounded-full bg-white/5" />
                </div>

                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid gap-5 rounded-2xl border border-white/10 bg-black/20 p-5 lg:grid-cols-12"
                        >
                            <div className="h-4 rounded-full bg-white/10 lg:col-span-3" />
                            <div className="h-4 rounded-full bg-white/10 lg:col-span-4" />
                            <div className="h-4 rounded-full bg-white/10 lg:col-span-2" />
                            <div className="h-4 rounded-full bg-white/10 lg:col-span-3" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm text-zinc-500">
                    {description}
                </p>
            </div>
        </div>
    );
}