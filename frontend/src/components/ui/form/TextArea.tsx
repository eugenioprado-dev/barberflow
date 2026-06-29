
import type { TextareaHTMLAttributes } from "react";
import { Field } from "./Field";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export function TextArea({
    label,
    error,
    className = "",
    ...props
}: TextAreaProps) {
    return (
        <Field label={label} error={error}>
            <textarea
                className={`
                    min-h-32
                    w-full
                    resize-none
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