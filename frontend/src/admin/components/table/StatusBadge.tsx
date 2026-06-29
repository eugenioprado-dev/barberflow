interface StatusBadgeProps {
    active: boolean;
}

export function StatusBadge({
    active,
}: StatusBadgeProps) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                active
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
            }`}
        >
            {active ? "Ativo" : "Inativo"}
        </span>
    );
}