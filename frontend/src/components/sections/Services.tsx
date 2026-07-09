import type { ReactNode } from "react";

import {
    FaCut,
    FaHandSparkles,
    FaSpa,
    FaStar,
} from "react-icons/fa";

import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";
import { ServiceCard } from "../ui/ServiceCard";

import { FadeIn } from "../../animations/FadeIn";

import { useCategories } from "../../hooks/useCategories";

const categoryIcons: Record<string, ReactNode> = {
    cut: <FaCut />,
    hand: <FaHandSparkles />,
    foot: <FaHandSparkles />,
    spa: <FaSpa />,
};

export function Services() {
    const { categories, loading } = useCategories();

    const activeCategories = categories.filter(
        (category) => category.active
    );

    if (loading || activeCategories.length === 0) {
        return null;
    }

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-zinc-950 pt-14 pb-20 sm:pt-16 sm:pb-24"
        >
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl sm:h-96 sm:w-96" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossos"
                        highlight="Serviços"
                        subtitle="Oferecemos serviços completos para cuidar da sua aparência, autoestima e bem-estar, sempre com atendimento personalizado e profissionais qualificados."
                    />

                    <div className="mt-12 sm:mt-12">
                        <ResponsiveCarousel
                            desktopColumns={3}
                            mobileSlidesPerView={1}
                            tabletSlidesPerView={2}
                        >
                            {activeCategories.map((category, index) => (
                                <FadeIn
                                    key={category.id}
                                    delay={index * 0.1}
                                >
                                    <ServiceCard
                                        icon={
                                            categoryIcons[
                                                category.icon
                                            ] ?? <FaStar />
                                        }
                                        title={category.name}
                                        description={
                                            category.description
                                        }
                                        category={category.name}
                                    />
                                </FadeIn>
                            ))}
                        </ResponsiveCarousel>
                    </div>
                </div>
            </Container>
        </section>
    );
}