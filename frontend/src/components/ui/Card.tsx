import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;

    className?: string;

    hover?: boolean;

    clickable?: boolean;

    padding?: "none" | "sm" | "md" | "lg";

    shadow?: "none" | "md" | "xl";

    rounded?: "xl" | "2xl" | "3xl";
}

export function Card({
    children,
    className = "",
    hover = false,
    clickable = false,
    padding = "lg",
    shadow = "md",
    rounded = "3xl",
}: CardProps) {
    const paddings = {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    const shadows = {
        none: "",
        md: "shadow-xl",
        xl: "shadow-2xl",
    };

    const radius = {
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
    };

    return (
        <div
            className={`
                ${radius[rounded]}
                ${paddings[padding]}
                ${shadows[shadow]}

                border
                border-zinc-800

                bg-gradient-to-b
                from-zinc-900
                to-zinc-950

                transition-all
                duration-300

                ${
                    hover
                        ? `
                    hover:scale-[1.03]
                    hover:border-amber-400
                    hover:shadow-[0_25px_60px_rgba(245,158,11,0.25)]
                `
                        : ""
                }

                ${
                    clickable
                        ? "cursor-pointer"
                        : ""
                }

                ${className}
            `}
        >
            {children}
        </div>
    );
}