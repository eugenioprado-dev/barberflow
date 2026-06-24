import { useState } from "react";

import { FaBars } from "react-icons/fa";

import { Container } from "./container";
import { MobileMenu } from "./MobileMenu";

import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <Container className="flex h-24 items-center justify-between">

                    {/* Logo */}
                    <Logo />

                    {/* Menu Desktop */}
                    <nav className="hidden items-center gap-10 text-sm font-medium text-zinc-300 lg:flex">

                        <a
                            href="#home"
                            className="transition hover:text-amber-400"
                        >
                            Início
                        </a>

                        <a
                            href="#services"
                            className="transition hover:text-amber-400"
                        >
                            Serviços
                        </a>

                        <a
                            href="#team"
                            className="transition hover:text-amber-400"
                        >
                            Equipe
                        </a>

                        <a
                            href="#gallery"
                            className="transition hover:text-amber-400"
                        >
                            Galeria
                        </a>

                        <a
                            href="#contact"
                            className="transition hover:text-amber-400"
                        >
                            Contato
                        </a>

                    </nav>

                    {/* Lado direito */}
                    <div className="flex items-center gap-4">

                        {/* Desktop */}
                        <div className="hidden lg:block">
                            <Button>
                                Agendar Horário
                            </Button>
                        </div>

                        {/* Mobile */}
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="rounded-lg border border-zinc-700 p-3 text-white transition hover:border-amber-500 hover:text-amber-400 lg:hidden"
                        >
                            <FaBars size={22} />
                        </Button>

                    </div>

                </Container>
            </header>

            <MobileMenu
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}