import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { ContactInfoCard } from "../ui/ContactInfoCard";

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaInstagram,
    FaClock,
    FaRoute,
} from "react-icons/fa";

import { useSite } from "../../hooks/useSite";

export function Contact() {
    const { site, loading } = useSite();

    if (loading || !site) {
        return null;
    }

    const whatsappNumber = site.business.whatsapp.replace(/\D/g, "");

    const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        site.business.address
    )}`;

    const googleMapsUrl =
        site.business.googleMapsUrl.trim() || mapsSearchUrl;

    const googleMapsEmbedUrl = site.business.googleMapsUrl.includes("/embed")
        ? site.business.googleMapsUrl
        : `https://www.google.com/maps?q=${encodeURIComponent(
              site.business.address
          )}&output=embed`;

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-zinc-950 py-24"
        >
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Entre em"
                        highlight="Contato"
                        subtitle={`Agende seu horário e venha viver uma experiência única no ${site.business.name}.`}
                    />

                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        <ContactInfoCard
                            icon={<FaMapMarkerAlt />}
                            title="Endereço"
                            value={site.business.address}
                        />

                        <ContactInfoCard
                            icon={<FaPhoneAlt />}
                            title="Telefone"
                            value={site.business.phone}
                        />

                        <ContactInfoCard
                            icon={<FaInstagram />}
                            title="Instagram"
                            value={site.business.instagram}
                        />

                        <ContactInfoCard
                            icon={<FaClock />}
                            title="Horário"
                            value={site.business.openingHours}
                        />
                    </div>

                    <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/70 shadow-2xl">
                        <div className="grid gap-0 lg:grid-cols-[1fr_380px]">
                            <div className="h-[320px] overflow-hidden lg:h-[420px]">
                                <iframe
                                    title={`Localização ${site.business.name}`}
                                    src={googleMapsEmbedUrl}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full border-0 grayscale invert-[0.9] contrast-[0.9]"
                                    allowFullScreen
                                />
                            </div>

                            <div className="flex flex-col justify-center p-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                                    Localização
                                </p>

                                <h3 className="mt-4 text-3xl font-bold text-white">
                                    Venha nos visitar
                                </h3>

                                <p className="mt-4 leading-7 text-zinc-400">
                                    Estamos localizados em{" "}
                                    <span className="text-zinc-200">
                                        {site.business.address}
                                    </span>
                                    . Clique abaixo para abrir a rota no Google
                                    Maps.
                                </p>

                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-amber-500 px-6 py-3 font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-black"
                                >
                                    <FaRoute />
                                    Ver rota no Google Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 flex justify-center">
                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-amber-500 px-10 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
                        >
                            Agendar pelo WhatsApp
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}