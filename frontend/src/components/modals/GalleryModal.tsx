import { useState } from "react";
import {
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
} from "react-icons/fa";

import type { Gallery } from "../../models/Gallery";

interface GalleryModalProps {
    item: Gallery | null;
    onClose: () => void;
}

export function GalleryModal({
    item,
    onClose,
}: GalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!item) {
        return null;
    }

    const images = [item.image, ...item.images].filter(Boolean);

    function previous() {
        setCurrentIndex((current) =>
            current === 0 ? images.length - 1 : current - 1
        );
    }

    function next() {
        setCurrentIndex((current) =>
            current === images.length - 1 ? 0 : current + 1
        );
    }

    return (
        <div className="fixed inset-0 z-[99999] bg-black text-white">
            <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-5 z-20 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                aria-label="Fechar galeria"
            >
                <FaTimes />
            </button>

            <div className="flex h-full flex-col">
                <div className="relative flex flex-1 items-center justify-center p-4">
                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={previous}
                            className="absolute left-4 z-10 rounded-full bg-white/10 p-4 transition hover:bg-white/20"
                            aria-label="Imagem anterior"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    <img
                        src={images[currentIndex]}
                        alt={item.title}
                        className="max-h-[70vh] max-w-full rounded-2xl object-contain"
                    />

                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={next}
                            className="absolute right-4 z-10 rounded-full bg-white/10 p-4 transition hover:bg-white/20"
                            aria-label="Próxima imagem"
                        >
                            <FaChevronRight />
                        </button>
                    )}
                </div>

                <div className="border-t border-white/10 bg-zinc-950 p-5">
                    <h2 className="text-2xl font-bold">
                        {item.title}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        {item.description}
                    </p>

                    {images.length > 1 && (
                        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                            {images.map((image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border ${
                                        index === currentIndex
                                            ? "border-amber-500"
                                            : "border-white/10"
                                    }`}
                                    aria-label={`Ver imagem ${index + 1}`}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}