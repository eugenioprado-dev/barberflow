import type { InputHTMLAttributes } from "react";
import { Field } from "./Field";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export function TextField({
    label,
    error,
    className = "",
    ...props
}: TextFieldProps) {
    return (
        <Field label={label} error={error}>
            <input
                className={`
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-black/30
                    px-4
                    py-3
                    text-white
                    outline-none
                    transition
                    placeholder:text-zinc-600
                    focus:border-amber-500
                    ${error ? "border-red-500" : ""}
                    ${className}
                `}
                {...props}
            />
        </Field>
    );
}