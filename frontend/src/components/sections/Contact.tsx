import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { ContactInfoCard } from "../ui/ContactInfoCard";

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaInstagram,
    FaClock,
} from "react-icons/fa";

import { contact } from "../../constants/contact";

export function Contact() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 py-24">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Entre em"
                        highlight="Contato"
                        subtitle="Agende seu horário e venha viver uma experiência única no André Dias Studio."
                    />

                    <div className="mt-16 grid gap-6 md:grid-cols-2">
                        <ContactInfoCard
                            icon={<FaMapMarkerAlt />}
                            title="Endereço"
                            value={contact.address}
                        />

                        <ContactInfoCard
                            icon={<FaPhoneAlt />}
                            title="Telefone"
                            value={contact.phone}
                        />

                        <ContactInfoCard
                            icon={<FaInstagram />}
                            title="Instagram"
                            value={contact.instagram}
                        />

                        <ContactInfoCard
                            icon={<FaClock />}
                            title="Horário"
                            value={contact.openingHours.join("\n")}
                        />
                    </div>

                    <div className="mt-16 flex justify-center">
                        <a
                            href={`https://wa.me/${contact.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="
                rounded-full
                bg-amber-500
                px-10
                py-4
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-xl
                hover:shadow-amber-500/30"
                        >
                            Agendar pelo WhatsApp
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}