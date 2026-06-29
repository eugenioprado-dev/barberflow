import type { ReactNode } from "react";

interface PageActionButtonProps {
    icon?: ReactNode;
    label: string;
    onClick: () => void;
}

export function PageActionButton({
    icon,
    label,
    onClick,
}: PageActionButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-amber-500
                px-5
                py-3
                font-semibold
                text-black
                transition
                hover:bg-amber-400
                active:scale-95
            "
        >
            {icon}

            <span>{label}</span>
        </button>
    );
}