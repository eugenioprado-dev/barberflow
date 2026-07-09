interface GalleryCardProps {
    title: string;
    image: string;
    description: string;
    professionalName: string;
    imagesCount?: number;
    onClick?: () => void;
}

export function GalleryCard({
    title,
    image,
    description,
    professionalName,
    imagesCount = 0,
    onClick,
}: GalleryCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 text-left shadow-2xl transition-all duration-500 hover:border-amber-500 lg:hover:-translate-y-3"
        >
            <div className="relative h-[420px] overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                        <span className="text-8xl">✂️</span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {imagesCount > 0 && (
                    <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                        📸 {imagesCount}{" "}
                        {imagesCount === 1 ? "foto" : "fotos"}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                        {professionalName}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold text-white">
                        {title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-300">
                        {description}
                    </p>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-center rounded-xl border border-zinc-700 py-3 font-semibold text-white transition group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                    Ver trabalho →
                </div>
            </div>
        </button>
    );
}