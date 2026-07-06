import { FadeIn } from "../../animations/FadeIn";

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
        <FadeIn>
            <div className="mx-auto mb-20 max-w-3xl text-center md:mb-24">
                <h2
                    className="text-4xl font-bold leading-tight text-white md:text-5xl"
                    style={{ fontFamily: "Playfair Display" }}
                >
                    {title}

                    <span className="mt-2 block text-amber-500">
                        {highlight}
                    </span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
                    {subtitle}
                </p>
            </div>
        </FadeIn>
    );
}