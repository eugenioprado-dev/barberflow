import { FaEdit, FaTrash } from "react-icons/fa";

interface TableActionsProps {
    editLabel: string;
    deleteLabel: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function TableActions({
    editLabel,
    deleteLabel,
    onEdit,
    onDelete,
}: TableActionsProps) {
    return (
        <div className="flex gap-2 lg:justify-end">
            <button
                type="button"
                aria-label={editLabel}
                onClick={onEdit}
                className="
                    rounded-xl
                    border
                    border-white/10
                    p-3
                    text-zinc-400
                    transition
                    hover:border-amber-500/40
                    hover:text-amber-400
                "
            >
                <FaEdit />
            </button>

            <button
                type="button"
                aria-label={deleteLabel}
                onClick={onDelete}
                className="
                    rounded-xl
                    border
                    border-white/10
                    p-3
                    text-zinc-400
                    transition
                    hover:border-red-500/40
                    hover:text-red-400
                "
            >
                <FaTrash />
            </button>
        </div>
    );
}