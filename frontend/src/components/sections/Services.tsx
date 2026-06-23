import { Container } from "../layout/container";
import { FaCut, FaHandSparkles, FaSpa } from "react-icons/fa";
import { ServiceCard } from "../ui/ServiceCard";
import { SectionTitle } from "../ui/SectionTitle";
import { services } from "../../constants/services";

const icons = {
    cut: <FaCut />,
    hand: <FaHandSparkles />,
    spa: <FaSpa />,
};

export function Services() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 py-24">
            {/* Efeitos de fundo */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossos"
                        highlight="Serviços"
                        subtitle="Oferecemos serviços completos para cuidar da sua aparência, autoestima e bem-estar, sempre com atendimento personalizado e profissionais qualificados."
                    />

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                icon={icons[service.icon as keyof typeof icons]}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}