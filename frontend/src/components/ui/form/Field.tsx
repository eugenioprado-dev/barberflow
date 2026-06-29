import type { ReactNode } from "react";

interface FieldProps {
    label: string;
    error?: string;
    children: ReactNode;
}

export function Field({
    label,
    error,
    children,
}: FieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">
                {label}
            </label>

            {children}

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}