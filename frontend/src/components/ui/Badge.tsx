interface BadgeProps {
    label: string;
}

export function Badge({ label }: BadgeProps) {
    return (
        <div
            className="
        rounded-full
        border
        border-zinc-700
        bg-zinc-900/70
        px-5
        py-2
        text-sm
        font-medium
        text-zinc-200
        backdrop-blur-sm
        transition-all
        hover:border-amber-500"
        >
            {label}
        </div>
    );
}