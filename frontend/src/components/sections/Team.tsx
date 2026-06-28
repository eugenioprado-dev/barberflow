import { Container } from "../layout/container";
import { TeamCard } from "../ui/TeamCard";
import { professionals } from "../../data";
import { SectionTitle } from "../ui/SectionTitle";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";

export function Team() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 py-24">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossa"
                        highlight="Equipe"
                        subtitle="Profissionais apaixonados pelo que fazem, oferecendo atendimento personalizado e excelência em cada detalhe."
                    />

                    <div className="mt-16">
                        <ResponsiveCarousel>
                            {professionals.map((member) => (
                                <TeamCard
                                    key={member.id}
                                    name={member.name}
                                    role={member.role}
                                    image={member.image}
                                    instagram={member.instagram ?? "#"}
                                />
                            ))}
                        </ResponsiveCarousel>
                    </div>
                </div>
            </Container>
        </section>
    );
}