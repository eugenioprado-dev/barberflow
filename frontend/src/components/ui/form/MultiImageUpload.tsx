import { useRef, useState } from "react";

import {
    FaCloudUploadAlt,
    FaImages,
    FaTrash,
} from "react-icons/fa";

interface SelectedImage {
    id: string;
    file: File;
    preview: string;
}

interface MultiImageUploadProps {
    label: string;
    onChange: (files: File[]) => void;
}

export function MultiImageUpload({
    label,
    onChange,
}: MultiImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<SelectedImage[]>([]);

    function notifyChange(updatedImages: SelectedImage[]) {
        onChange(updatedImages.map((image) => image.file));
    }

    function handleFiles(files: FileList | null) {
        if (!files) {
            return;
        }

        const newImages = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
        }));

        const updatedImages = [...images, ...newImages];

        setImages(updatedImages);
        notifyChange(updatedImages);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    function removeImage(id: string) {
        const updatedImages = images.filter(
            (image) => image.id !== id
        );

        setImages(updatedImages);
        notifyChange(updatedImages);
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <label className="block text-sm font-medium text-zinc-300">
                    {label}
                </label>

                {images.length > 0 && (
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                        {images.length}{" "}
                        {images.length === 1 ? "foto" : "fotos"}
                    </span>
                )}
            </div>

            <div
                onClick={() => inputRef.current?.click()}
                className="
                    cursor-pointer
                    rounded-2xl
                    border-2
                    border-dashed
                    border-white/10
                    bg-zinc-900
                    p-6
                    transition
                    hover:border-amber-500/40
                "
            >
                <div className="flex flex-col items-center gap-3 py-8 text-zinc-500">
                    <span className="text-5xl text-amber-400">
                        <FaCloudUploadAlt />
                    </span>

                    <p className="font-semibold text-white">
                        Adicionar imagens
                    </p>

                    <p className="text-center text-sm">
                        Você pode adicionar mais imagens depois sem perder as anteriores.
                    </p>

                    <span className="text-3xl">
                        <FaImages />
                    </span>
                </div>

                <input
                    ref={inputRef}
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        handleFiles(event.target.files)
                    }
                />
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900"
                        >
                            <img
                                src={image.preview}
                                alt={`Imagem ${index + 1}`}
                                className="h-36 w-full object-cover"
                            />

                            <button
                                type="button"
                                aria-label={`Remover imagem ${index + 1}`}
                                onClick={() => removeImage(image.id)}
                                className="
                                    absolute
                                    right-2
                                    top-2
                                    rounded-lg
                                    bg-red-600
                                    p-2
                                    text-white
                                    transition
                                    hover:bg-red-500
                                "
                            >
                                <FaTrash />
                            </button>

                            <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}