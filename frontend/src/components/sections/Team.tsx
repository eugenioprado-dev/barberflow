import { Container } from "../layout/container";
import { TeamCard } from "../ui/TeamCard";
import { SectionTitle } from "../ui/SectionTitle";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";

import { useProfessionals } from "../../hooks/useProfessionals";
import { FadeIn } from "../../animations/FadeIn";

export function Team() {
    const { professionals, loading } = useProfessionals();

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    );

    if (loading || activeProfessionals.length === 0) {
        return null;
    }

    return (
        <section
            id="team"
            className="relative overflow-hidden bg-zinc-950 py-20 sm:py-24"
        >
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl sm:h-96 sm:w-96" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossa"
                        highlight="Equipe"
                        subtitle="Profissionais apaixonados pelo que fazem, oferecendo atendimento personalizado e excelência em cada detalhe."
                    />

                    <div className="mt-12 sm:mt-16">
                        <ResponsiveCarousel
                            desktopColumns={3}
                            mobileSlidesPerView={1}
                            tabletSlidesPerView={2}
                            autoplay
                            delay={4500}
                        >
                            {activeProfessionals.map((member, index) => (
                                <FadeIn
                                    key={member.id}
                                    delay={index * 0.1}
                                >
                                    <TeamCard
                                        name={member.name}
                                        role={member.role}
                                        image={member.image}
                                        instagram={member.instagram ?? "#"}
                                        whatsapp={member.whatsapp}
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