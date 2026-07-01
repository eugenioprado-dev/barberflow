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
    return (
        <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:border-amber-500 lg:hover:-translate-y-2">
            <span className="absolute right-6 top-6 text-6xl text-amber-500/10">
                <FaQuoteLeft />
            </span>

            <div className="mb-6 flex gap-1">
                {Array.from({ length: rating }).map((_, index) => (
                    <span key={index} className="text-amber-500">
                        <FaStar />
                    </span>
                ))}
            </div>

            <p className="leading-8 text-zinc-300">
                "{content}"
            </p>

            <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-amber-500/10 text-lg font-bold text-amber-400">
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

                <div>
                    <h3 className="font-bold text-white">
                        {name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
}