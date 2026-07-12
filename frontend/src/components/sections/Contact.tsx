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
import { createWhatsappUrl } from "../../utils/whatsapp";

export function Contact() {
    const { site, loading } = useSite();

    if (loading || !site) {
        return null;
    }

    const whatsappUrl = createWhatsappUrl(
        site.business.whatsapp,
        "Olá! Gostaria de agendar um horário."
    );

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
            className="relative overflow-hidden bg-zinc-950 pt-14 pb-20 sm:pt-16 sm:pb-24"
        >
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl sm:h-96 sm:w-96" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Entre em"
                        highlight="Contato"
                        subtitle={`Agende seu horário e venha viver uma experiência única no ${site.business.name}.`}
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2 sm:mt-12">
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
                        <div className="grid lg:grid-cols-[1fr_380px]">
                            <div className="h-[260px] overflow-hidden sm:h-[340px] lg:h-[420px]">
                                <iframe
                                    title={`Localização ${site.business.name}`}
                                    src={googleMapsEmbedUrl}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="h-full w-full border-0 grayscale invert-[0.9] contrast-[0.9]"
                                    allowFullScreen
                                />
                            </div>

                            <div className="flex flex-col justify-center p-6 sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 sm:text-sm">
                                    Localização
                                </p>

                                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                                    Venha nos visitar
                                </h3>

                                <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
                                    Estamos localizados em{" "}
                                    <span className="font-semibold text-zinc-200">
                                        {site.business.address}
                                    </span>
                                    . Clique abaixo para abrir a rota no Google
                                    Maps.
                                </p>

                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full border border-amber-500 px-6 py-3 text-sm font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-black sm:w-auto sm:text-base"
                                >
                                    <FaRoute />
                                    Ver rota no Google Maps
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center sm:mt-16">
                        <a
                            href={whatsappUrl}
                            className="w-full rounded-full bg-amber-500 px-8 py-4 text-center font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30 sm:w-auto sm:px-10"
                        >
                            Agendar pelo WhatsApp
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}