interface FormActionsProps {
    onCancel: () => void;
    onSubmit: () => void | Promise<void>;
}

export function FormActions({
    onCancel,
    onSubmit,
}: FormActionsProps) {
    return (
        <div className="flex gap-3 pt-6">
            <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-white/10 px-5 py-3 font-semibold text-zinc-300 transition hover:border-zinc-600 hover:text-white"
            >
                Cancelar
            </button>

            <button
                type="button"
                onClick={() => void onSubmit()}
                className="flex-1 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition hover:bg-amber-400"
            >
                Salvar
            </button>
        </div>
    );
}