interface GalleryCardProps {
    title: string;
    image: string;
}

export function GalleryCard({
    title,
    image,
}: GalleryCardProps) {
    return (
        <div
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

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-all duration-500 group-hover:from-black" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white">
                    {title}
                </h3>

                <button
                    type="button"
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        font-semibold
                        text-amber-500
                        opacity-100
                        transition-all
                        duration-500
                        lg:opacity-0
                        lg:group-hover:translate-x-2
                        lg:group-hover:opacity-100
                    "
                >
                    Ver mais →
                </button>
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
        </div>
    );
}