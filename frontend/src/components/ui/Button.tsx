import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
}

export function Button({
    children,
    variant = "primary",
    leftIcon,
    rightIcon,
    loading = false,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const variants: Record<
        NonNullable<ButtonProps["variant"]>,
        string
    > = {
        primary:
            "bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/30",
        secondary:
            "border border-zinc-700 text-white hover:border-amber-500 hover:bg-amber-500/10",
        danger:
            "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500",
    };

    return (
        <button
            disabled={disabled || loading}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-6
                py-3
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                active:translate-y-0
                active:scale-[0.98]
                focus:outline-none
                focus:ring-2
                focus:ring-amber-500/60
                focus:ring-offset-2
                focus:ring-offset-zinc-950
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:translate-y-0
                disabled:active:scale-100
                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
                leftIcon
            )}

            {children}

            {!loading && rightIcon}
        </button>
    );
}