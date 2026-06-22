import { Container } from "./container";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Navbar() {
    return (
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <Container className="flex h-24 items-center justify-between">

                <Logo />

                <nav className="hidden items-center gap-10 text-sm font-medium text-zinc-300 lg:flex">

                    <a className="transition hover:text-amber-400" href="#">
                        Início
                    </a>

                    <a className="transition hover:text-amber-400" href="#">
                        Serviços
                    </a>

                    <a className="transition hover:text-amber-400" href="#">
                        Equipe
                    </a>

                    <a className="transition hover:text-amber-400" href="#">
                        Galeria
                    </a>

                    <a className="transition hover:text-amber-400" href="#">
                        Contato
                    </a>

                </nav>

                <Button>
                    Agendar Horário
                </Button>

            </Container>
        </header>
    );
}