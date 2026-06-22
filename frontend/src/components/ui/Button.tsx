import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary";
}

export function Button({
    children,
    variant = "primary",
    className = "",
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-amber-500 text-black hover:bg-amber-400",

        secondary:
            "border border-zinc-700 text-white hover:border-amber-500",
    };

    return (
        <button
            className={`
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-1
        ${variants[variant]}
        ${className}
        `}
            {...props}
        >
            {children}
        </button>
    );
}