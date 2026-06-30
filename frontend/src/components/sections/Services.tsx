import { Container } from "../layout/container";
import {
    FaCut,
    FaHandSparkles,
    FaSpa,
    FaStar,
} from "react-icons/fa";

import type { ReactNode } from "react";
import type { Category } from "../../models/Category";

import { ServiceCard } from "../ui/ServiceCard";
import { SectionTitle } from "../ui/SectionTitle";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";

import { categoriesStore } from "../../store/categoriesStore";

const icons: Record<string, ReactNode> = {
    cut: <FaCut />,
    hand: <FaHandSparkles />,
    foot: <FaHandSparkles />,
    spa: <FaSpa />,
};

export function Services() {
    const categories = categoriesStore.getActive();

    return (
        <section id="services" className="relative bg-zinc-950 py-24">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossos"
                        highlight="Serviços"
                        subtitle="Oferecemos serviços completos para cuidar da sua aparência, autoestima e bem-estar, sempre com atendimento personalizado e profissionais qualificados."
                    />

                    <ResponsiveCarousel
                        desktopColumns={3}
                        mobileSlidesPerView={1}
                        tabletSlidesPerView={2}
                    >
                        {categories.map((category: Category) => (
                            <ServiceCard
                                key={category.id}
                                icon={icons[category.icon] ?? <FaStar />}
                                title={category.name}
                                description={category.description}
                                category={category.name}
                            />
                        ))}
                    </ResponsiveCarousel>
                </div>
            </Container>
        </section>
    );
}