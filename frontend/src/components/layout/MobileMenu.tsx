import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileMenu({
    isOpen,
    onClose,
}: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Menu */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed right-0 top-0 z-50 flex h-screen w-80 flex-col bg-zinc-950 p-8 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="mb-10 self-end text-3xl text-white"
                        >
                            ✕
                        </button>

                        <nav className="flex flex-col gap-8 text-xl text-white">

                            <a href="#home" onClick={onClose}>
                                Início
                            </a>

                            <a href="#services" onClick={onClose}>
                                Serviços
                            </a>

                            <a href="#team" onClick={onClose}>
                                Equipe
                            </a>

                            <a href="#gallery" onClick={onClose}>
                                Galeria
                            </a>

                            <a href="#contact" onClick={onClose}>
                                Contato
                            </a>

                        </nav>

                        <div className="mt-auto">
                            <Button className="w-full">
                                Agendar Horário
                            </Button>
                        </div>

                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}