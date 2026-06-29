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
        primary: "bg-amber-500 text-black hover:bg-amber-400",
        secondary: "border border-zinc-700 text-white hover:border-amber-500",
        danger: "bg-red-600 text-white hover:bg-red-500",
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
                disabled:cursor-not-allowed
                disabled:opacity-60
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