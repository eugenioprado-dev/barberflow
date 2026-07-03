import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black px-4 py-6">
                    <motion.div
                        className="flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 py-4">
                            <h2 className="text-xl font-bold text-white md:text-2xl">
                                {title}
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                                aria-label="Fechar modal"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}