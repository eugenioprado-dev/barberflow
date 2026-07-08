import { FaQuoteLeft, FaStar } from "react-icons/fa";

interface TestimonialCardProps {
    name: string;
    role?: string;
    image?: string;
    content: string;
    rating: number;
}

export function TestimonialCard({
    name,
    role = "Cliente",
    image,
    content,
    rating,
}: TestimonialCardProps) {
    const safeRating = Math.min(Math.max(rating, 1), 5);

    return (
        <div className="group relative flex h-full min-h-[260px] w-full flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:border-amber-500 lg:hover:-translate-y-2">
            <span className="absolute right-6 top-6 text-6xl text-amber-500/10">
                <FaQuoteLeft />
            </span>

            <div className="mb-6 flex gap-1">
                {Array.from({ length: safeRating }).map((_, index) => (
                    <span key={index} className="text-amber-500">
                        <FaStar />
                    </span>
                ))}
            </div>

            <p className="relative z-10 line-clamp-4 leading-8 text-zinc-300">
                "{content}"
            </p>

            <div className="mt-auto flex items-center gap-4 pt-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-500/10 text-lg font-bold text-amber-400">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        name.charAt(0)
                    )}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate font-bold text-white">
                        {name}
                    </h3>

                    <p className="truncate text-sm text-zinc-500">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
}