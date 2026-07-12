import { Container } from "../layout/container";
import { Logo } from "../ui/Logo";

import {
    FaInstagram,
    FaWhatsapp,
    FaArrowUp,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from "react-icons/fa";

import { useSite } from "../../hooks/useSite";
import { createWhatsappUrl } from "../../utils/whatsapp";

export function Footer() {
    const { site, loading } = useSite();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (loading || !site) {
        return null;
    }

    const whatsappUrl = createWhatsappUrl(
        site.business.whatsapp,
        "Olá! Gostaria de agendar um horário."
    );

    const instagramUrl = site.business.instagram.startsWith("http")
        ? site.business.instagram
        : `https://instagram.com/${site.business.instagram.replace("@", "")}`;

    return (
        <footer className="relative overflow-hidden border-t border-zinc-800 bg-gradient-to-b from-zinc-950 to-black">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />

            <Container>
                <div className="relative z-10 grid gap-12 py-16 sm:py-20 md:grid-cols-3">
                    <div>
                        <Logo />

                        <p className="mt-6 max-w-sm leading-7 text-zinc-400">
                            {site.business.description ||
                                "Barbearia • Estética • Bem-estar. Um espaço criado para elevar sua autoestima."}
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Navegação
                        </h3>

                        <ul className="grid grid-cols-2 gap-4 text-zinc-400 sm:block sm:space-y-4">
                            {[
                                { label: "Início", href: "#home" },
                                { label: "Serviços", href: "#services" },
                                { label: "Equipe", href: "#team" },
                                { label: "Galeria", href: "#gallery" },
                                { label: "Contato", href: "#contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="transition hover:text-amber-500"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-xl font-semibold text-white">
                            Contato
                        </h3>

                        <div className="space-y-4 text-zinc-400">
                            <p className="flex items-start gap-3">
                                <FaPhoneAlt className="mt-1 text-amber-500" />
                                {site.business.phone}
                            </p>

                            <p className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-amber-500" />
                                {site.business.address}
                            </p>

                            <div className="flex gap-4 pt-4">
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-zinc-700 p-3 transition hover:border-amber-500 hover:bg-amber-500 hover:text-black"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>

                                <a
                                    href={whatsappUrl}
                                    className="rounded-full border border-zinc-700 p-3 transition hover:border-green-500 hover:bg-green-500 hover:text-black"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-between gap-6 border-t border-zinc-800 py-8 text-center md:flex-row md:text-left">
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} {site.business.name}.
                        Todos os direitos reservados.
                    </p>

                    <p className="text-sm text-zinc-500">
                        Desenvolvido por{" "}
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
                        type="button"
                        onClick={scrollToTop}
                        className="rounded-full bg-amber-500 p-4 text-black shadow-lg shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-110"
                        aria-label="Voltar ao topo"
                    >
                        <FaArrowUp />
                    </button>
                </div>
            </Container>
        </footer>
    );
}