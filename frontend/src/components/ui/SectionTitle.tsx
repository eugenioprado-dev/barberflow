interface SectionTitleProps {
    title: string;
    highlight: string;
    subtitle: string;
}

export function SectionTitle({
    title,
    highlight,
    subtitle,
}: SectionTitleProps) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <h2
                className="text-5xl font-bold text-white"
                style={{ fontFamily: "Playfair Display" }}
            >
                {title}

                <span className="mt-2 block text-amber-500">
                    {highlight}
                </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                {subtitle}
            </p>
        </div>
    );
}