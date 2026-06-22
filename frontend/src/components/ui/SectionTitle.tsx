interface SectionTitleProps {
    overline: string;
    title: string;
    description?: string;
    center?: boolean;
}

export function SectionTitle({
    overline,
    title,
    description,
    center = true,
}: SectionTitleProps) {
    return (
        <div className={center ? "text-center" : ""}>
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">
                {overline}
            </span>

            <h2
                className="mt-4 text-4xl font-bold text-white lg:text-5xl"
                style={{ fontFamily: "Playfair Display" }}
            >
                {title}
            </h2>

            {description && (
                <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
                    {description}
                </p>
            )}
        </div>
    );
}