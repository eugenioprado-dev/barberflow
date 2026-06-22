import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-amber-500/40
        hover:shadow-xl
        hover:shadow-black/40
        ${className}
    `}
        >
            {children}
        </div>
    );
}