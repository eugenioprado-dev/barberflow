import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export function Modal({
    open,
    onClose,
    title,
    children,
}: ModalProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Fundo */}
                    <motion.div
                        className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed left-1/2 top-1/2 z-[1000] w-[92%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl"
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            y: 30,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >
                        {/* Cabeçalho */}
                        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
                            <h2 className="text-2xl font-bold text-white">
                                {title}
                            </h2>

                            <button
                                onClick={onClose}
                                title="Fechar"
                                aria-label="Fechar modal"
                                className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Conteúdo */}
                        <div className="max-h-[70vh] overflow-y-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
