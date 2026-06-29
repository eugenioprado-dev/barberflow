import type { SelectHTMLAttributes } from "react";
import { Field } from "./Field";

interface SelectOption {
    label: string;
    value: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: SelectOption[];
}

export function SelectField({
    label,
    error,
    options,
    className = "",
    ...props
}: SelectFieldProps) {
    return (
        <Field label={label} error={error}>
            <select
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
                    focus:border-amber-500
                    ${error ? "border-red-500" : ""}
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className="bg-zinc-950 text-white"
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </Field>
    );
}