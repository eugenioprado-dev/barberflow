import type { ReactNode } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import { Button } from "../../components/ui/Button";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    icon?: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    icon,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4">
            <button
                type="button"
                aria-label="Fechar confirmação"
                onClick={onCancel}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-red-500/10 p-4 text-red-400">
                        {icon ?? <FaExclamationTriangle />}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {title}
                        </h2>

                        <p className="mt-2 leading-7 text-zinc-400">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        className="flex-1"
                    >
                        {cancelLabel}
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        className="flex-1"
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}