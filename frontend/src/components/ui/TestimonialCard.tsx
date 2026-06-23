import { FaQuoteLeft, FaStar } from "react-icons/fa";

interface TestimonialCardProps {
    name: string;
    text: string;
    rating: number;
}

export function TestimonialCard({
    name,
    text,
    rating,
}: TestimonialCardProps) {
    return (
        <div
            className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-amber-500
    "
        >
            {/* 1. Correção do FaQuoteLeft: Envolvido em um span com as classes de posicionamento */}
            <span className="absolute right-6 top-6 text-6xl text-amber-500/10">
                <FaQuoteLeft />
            </span>

            <div className="mb-6 flex gap-1">
                {[...Array(rating)].map((_, index) => (
                    /* 2. Correção do FaStar: Envolvido em um span com a cor */
                    <span key={index} className="text-amber-500">
                        <FaStar />
                    </span>
                ))}
            </div>

            <p className="leading-8 text-zinc-300">
                "{text}"
            </p>

            <h3 className="mt-8 text-lg font-bold text-white">
                {name}
            </h3>
        </div>
    );
}