import { Container } from "../layout/container";
import { FaCut, FaHandSparkles, FaSpa } from "react-icons/fa";

import { ServiceCard } from "../ui/ServiceCard";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";

import { serviceCategories } from "../../data/serviceCategories";

const icons = {
    cut: <FaCut />,
    hand: <FaHandSparkles />,
    spa: <FaSpa />,
};

export function Services() {
    return (
        <section
            id="services"
            className="relative bg-zinc-950 py-24"
        >
            {/* Glow */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossos"
                        highlight="Serviços"
                        subtitle="Oferecemos serviços completos para cuidar da sua aparência, autoestima e bem-estar, sempre com atendimento personalizado e profissionais qualificados."
                    />

                    <div className="mt-16">
                        <ResponsiveCarousel desktopColumns={3}>
                            {serviceCategories.map((category) => (
                                <Reveal key={category.id}>
                                    <ServiceCard
                                        icon={
                                            icons[
                                                category.icon as keyof typeof icons
                                            ]
                                        }
                                        title={category.title}
                                        description={category.description}
                                        category={category.title}
                                    />
                                </Reveal>
                            ))}
                        </ResponsiveCarousel>
                    </div>
                </div>
            </Container>
        </section>
    );
}