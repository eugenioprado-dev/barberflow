import { FaSearch } from "react-icons/fa";

interface TableSearchProps {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export function TableSearch({
    value,
    placeholder = "Buscar...",
    onChange,
}: TableSearchProps) {
    return (
        <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-3">
            <span className="text-zinc-500">
                <FaSearch />
            </span>

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
            />
        </div>
    );
}