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
            className="
                group
                relative
                h-80
                w-full
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                text-left
                shadow-xl
                transition-all
                duration-500
                hover:border-amber-500
                lg:hover:-translate-y-2
            "
        >
            {image ? (
                <img
                    src={image}
                    alt={title}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                    "
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                    <span className="text-7xl">✂️</span>
                </div>
            )}

            {imagesCount > 0 && (
                <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    📸 {imagesCount} {imagesCount === 1 ? "foto" : "fotos"}
                </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
                    {professionalName}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                    {title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm text-zinc-300">
                    {description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-amber-500">
                    Ver trabalho →
                </span>
            </div>

            <div
                className="
                    absolute
                    -left-40
                    top-0
                    hidden
                    h-full
                    w-20
                    rotate-12
                    bg-white/10
                    opacity-0
                    blur-xl
                    transition-all
                    duration-700
                    lg:block
                    group-hover:left-[120%]
                    group-hover:opacity-100
                "
            />
        </button>
    );
}