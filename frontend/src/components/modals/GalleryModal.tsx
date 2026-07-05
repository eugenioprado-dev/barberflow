import { useEffect, useState } from "react";
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

    useEffect(() => {
        setCurrentIndex(0);
    }, [item]);

    useEffect(() => {
        if (!item) return;

        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                previous();
            }

            if (event.key === "ArrowRight") {
                next();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [item, currentIndex]);

    if (!item) {
        return null;
    }

    const images = [item.image, ...item.images].filter(Boolean);

    function previous() {
        setCurrentIndex((current) =>
            current === 0
                ? images.length - 1
                : current - 1
        );
    }

    function next() {
        setCurrentIndex((current) =>
            current === images.length - 1
                ? 0
                : current + 1
        );
    }

    return (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md text-white">
            <button
                type="button"
                onClick={onClose}
                className="absolute right-6 top-6 z-30 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                aria-label="Fechar galeria"
            >
                <FaTimes />
            </button>

            <div className="flex h-full flex-col">
                <div className="relative flex flex-1 items-center justify-center p-6">
                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={previous}
                            className="absolute left-6 rounded-full bg-white/10 p-4 transition hover:bg-white/20"
                            aria-label="Imagem anterior"
                        >
                            <FaChevronLeft />
                        </button>
                    )}

                    <img
                        src={images[currentIndex]}
                        alt={item.title}
                        className="max-h-[75vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
                    />

                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={next}
                            className="absolute right-6 rounded-full bg-white/10 p-4 transition hover:bg-white/20"
                            aria-label="Próxima imagem"
                        >
                            <FaChevronRight />
                        </button>
                    )}

                    {images.length > 1 && (
                        <div className="absolute bottom-5 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold backdrop-blur">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </div>

                <div className="border-t border-white/10 bg-zinc-950 p-6">
                    <h2 className="text-3xl font-bold">
                        {item.title}
                    </h2>

                    <p className="mt-3 max-w-3xl text-zinc-400">
                        {item.description}
                    </p>

                    {images.length > 1 && (
                        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setCurrentIndex(index)
                                    }
                                    className={`overflow-hidden rounded-2xl border transition ${
                                        currentIndex === index
                                            ? "border-amber-500 scale-105"
                                            : "border-white/10"
                                    }`}
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="h-24 w-28 object-cover"
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