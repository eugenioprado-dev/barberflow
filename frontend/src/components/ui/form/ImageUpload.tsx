import { useRef, useState } from "react";

import { FaCloudUploadAlt, FaImage, FaTrash } from "react-icons/fa";

interface ImageUploadProps {
    label: string;
    error?: string;
    initialPreview?: string;
    onChange: (file: File | null) => void;
}

export function ImageUpload({
    label,
    error,
    initialPreview,
    onChange,
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        initialPreview ?? null
    );

    function handleSelect(file: File | null) {
        onChange(file);

        if (!file) {
            setPreview(null);

            if (inputRef.current) {
                inputRef.current.value = "";
            }

            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    }

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-300">
                {label}
            </label>

            <div
                onClick={() => inputRef.current?.click()}
                className={`
                    cursor-pointer
                    rounded-2xl
                    border-2
                    border-dashed
                    bg-zinc-900
                    p-6
                    transition
                    ${
                        error
                            ? "border-red-500/50"
                            : "border-white/10 hover:border-amber-500/40"
                    }
                `}
            >
                {preview ? (
                    <div className="space-y-4">
                        <img
                            src={preview}
                            alt="Preview"
                            className="h-56 w-full rounded-xl object-cover"
                        />

                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleSelect(null);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 py-3 text-red-400 transition hover:bg-red-500/10"
                        >
                            <FaTrash />
                            Remover imagem
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-10 text-zinc-500">
                        <span className="text-5xl text-amber-400">
                            <FaCloudUploadAlt />
                        </span>

                        <div className="text-center">
                            <p className="font-semibold text-white">
                                Clique para selecionar uma imagem
                            </p>

                            <p className="mt-2 text-sm">
                                JPG, PNG ou WEBP
                            </p>
                        </div>

                        <span className="text-3xl">
                            <FaImage />
                        </span>
                    </div>
                )}

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        handleSelect(event.target.files?.[0] ?? null)
                    }
                />
            </div>

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}