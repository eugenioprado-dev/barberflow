interface SwitchFieldProps {
    label: string;
    description?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
}

export function SwitchField({
    label,
    description,
    checked = false,
    disabled = false,
    onChange,
}: SwitchFieldProps) {
    return (
        <label
            className={`
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/10
                bg-black/30
                p-4
                transition
                ${
                    disabled
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:border-amber-500/40"
                }
            `}
        >
            <div className="pr-4">
                <p className="font-medium text-white">
                    {label}
                </p>

                {description && (
                    <p className="mt-1 text-sm text-zinc-500">
                        {description}
                    </p>
                )}
            </div>

            <input
                type="checkbox"
                defaultChecked={checked}
                disabled={disabled}
                onChange={(event) => onChange?.(event.target.checked)}
                className="
                    h-5
                    w-5
                    cursor-pointer
                    accent-amber-500
                    disabled:cursor-not-allowed
                "
            />
        </label>
    );
}