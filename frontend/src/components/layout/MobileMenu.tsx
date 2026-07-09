import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

import { scrollToSection } from "../../utils/scrollToSection";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { label: "Início", id: "home" },
    { label: "Serviços", id: "services" },
    { label: "Equipe", id: "team" },
    { label: "Galeria", id: "gallery" },
    { label: "Contato", id: "contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    function handleNavigate(id: string) {
        onClose();

        setTimeout(() => {
            scrollToSection(id);
        }, 250);
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.button
                        type="button"
                        aria-label="Fechar menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
                    />

                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed right-0 top-0 z-50 flex h-dvh w-[86vw] max-w-sm flex-col border-l border-white/10 bg-zinc-950 p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <Logo />

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Fechar menu"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:border-amber-500/40 hover:text-amber-400"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <nav className="mt-12 flex flex-col gap-3">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleNavigate(item.id)}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-lg font-semibold text-white transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto space-y-4">
                            <p className="text-sm leading-6 text-zinc-500">
                                Agende seu horário e venha viver uma experiência
                                completa.
                            </p>

                            <Button
                                type="button"
                                onClick={() => handleNavigate("team")}
                                className="w-full"
                            >
                                Agendar Horário
                            </Button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}