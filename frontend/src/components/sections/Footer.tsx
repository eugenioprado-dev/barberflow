import { Container } from "../layout/container";
import { Logo } from "../ui/Logo";

import {
    FaInstagram,
    FaWhatsapp,
    FaArrowUp,
} from "react-icons/fa";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="relative overflow-hidden border-t border-zinc-800 bg-gradient-to-b from-zinc-950 to-black">
            {/* Glow de fundo */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

            <Container>
                <div className="relative z-10 grid gap-12 py-20 md:grid-cols-3">

                    {/* Marca */}
                    <div>
                        <Logo />

                        <p className="mt-6 max-w-sm leading-7 text-zinc-400">
                            Barbearia • Estética • Bem-estar.
                            Um espaço criado para elevar sua autoestima,
                            oferecendo atendimento personalizado,
                            conforto e excelência em cada atendimento.
                        </p>
                    </div>

                    {/* Navegação */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Navegação
                        </h3>

                        <ul className="space-y-4 text-zinc-400">

                            <li>
                                <a
                                    href="#home"
                                    className="transition hover:text-amber-500"
                                >
                                    Início
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#services"
                                    className="transition hover:text-amber-500"
                                >
                                    Serviços
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#team"
                                    className="transition hover:text-amber-500"
                                >
                                    Equipe
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#gallery"
                                    className="transition hover:text-amber-500"
                                >
                                    Galeria
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#contact"
                                    className="transition hover:text-amber-500"
                                >
                                    Contato
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Contato
                        </h3>

                        <div className="space-y-4 text-zinc-400">

                            <p>(11) 99999-9999</p>

                            <p>Embu das Artes • SP</p>

                            <div className="flex gap-4 pt-4">

                                <a
                                    href="https://www.instagram.com/andre_dias.6/"
                                    className="rounded-full border border-zinc-700 p-3 transition hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                                >
                                    <FaInstagram />
                                </a>

                                <a
                                    href="https://wa.me/5511998225572"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-zinc-700 p-3 transition hover:border-green-500 hover:bg-green-500 hover:text-black"
                                >
                                    <FaWhatsapp />
                                </a>

                            </div>

                        </div>
                    </div>

                </div>

                {/* Rodapé inferior */}
                <div className="relative z-10 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 py-8 md:flex-row">

                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} André Dias Studio.
                        Todos os direitos reservados.
                    </p>

                    <p className="text-sm text-zinc-500">
                        Desenvolvido  por{" "}
                        <a
                            href="https://github.com/eugenioprado-dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-amber-500 transition hover:text-amber-400 hover:underline"
                        >
                            Eugênio Prado
                        </a>
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="
                            rounded-full
                            bg-amber-500
                            p-4
                            text-black
                            shadow-lg
                            shadow-amber-500/30
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:scale-110
                        "
                        aria-label="Voltar ao topo"
                    >
                        <FaArrowUp />
                    </button>

                </div>
            </Container>
        </footer>
    );
}