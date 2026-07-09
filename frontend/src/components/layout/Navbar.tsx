import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import { Container } from "./container";
import { MobileMenu } from "./MobileMenu";

import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

import { scrollToSection } from "../../utils/scrollToSection";

const navItems = [
    { label: "Início", id: "home" },
    { label: "Serviços", id: "services" },
    { label: "Equipe", id: "team" },
    { label: "Galeria", id: "gallery" },
    { label: "Contato", id: "contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        function handleScroll() {
            const currentSection = [...navItems]
                .reverse()
                .find((item) => {
                    const section = document.getElementById(item.id);

                    if (!section) {
                        return false;
                    }

                    return window.scrollY >= section.offsetTop - 160;
                });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        }

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleNavigate(id: string) {
        scrollToSection(id);
        setIsOpen(false);
    }

    return (
        <>
            <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
                <Container className="flex h-20 items-center justify-between gap-4 sm:h-24">
                    <div className="min-w-0 shrink">
                        <Logo />
                    </div>

                    <nav className="hidden items-center gap-10 text-sm font-medium text-zinc-300 lg:flex">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNavigate(item.id)}
                                className={`relative pb-1 transition ${
                                    activeSection === item.id
                                        ? "text-amber-400"
                                        : "hover:text-amber-400"
                                }`}
                            >
                                {item.label}

                                {activeSection === item.id && (
                                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-400" />
                                )}
                            </button>
                        ))}
                    </nav>

                    <div className="flex shrink-0 items-center gap-4">
                        <div className="hidden lg:block">
                            <Button
                                type="button"
                                onClick={() => handleNavigate("contact")}
                            >
                                Agendar Horário
                            </Button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            aria-label="Abrir menu"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:border-amber-500/40 hover:text-amber-400 lg:hidden"
                        >
                            <FaBars size={20} />
                        </button>
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