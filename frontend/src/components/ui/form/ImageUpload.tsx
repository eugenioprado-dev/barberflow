import { useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import { Field } from "./Field";

interface ImageUploadProps {
    label: string;
    error?: string;
    onChange?: (file: File | null) => void;
}

export function ImageUpload({
    label,
    error,
    onChange,
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);
        onChange?.(file);
    }

    function handleRemoveImage() {
        setPreview(null);
        onChange?.(null);
    }

    return (
        <Field label={label} error={error}>
            {preview ? (
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    <img
                        src={preview}
                        alt="Prévia da imagem selecionada"
                        className="h-56 w-full object-cover"
                    />

                    <button
                        type="button"
                        aria-label="Remover imagem"
                        onClick={handleRemoveImage}
                        className="absolute right-3 top-3 rounded-xl bg-black/70 p-3 text-red-400 backdrop-blur transition hover:bg-red-500 hover:text-white"
                    >
                        <FaTrash />
                    </button>
                </div>
            ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/30 px-6 py-10 text-center transition hover:border-amber-500/60">
                    <span className="text-4xl text-amber-400">
                        <FaImage />
                    </span>

                    <span className="mt-4 font-semibold text-white">
                        Clique para selecionar uma imagem
                    </span>

                    <span className="mt-2 text-sm text-zinc-500">
                        PNG, JPG, JPEG ou WEBP
                    </span>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            )}
        </Field>
    );
}