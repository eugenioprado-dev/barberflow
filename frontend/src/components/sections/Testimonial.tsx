import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { TestimonialCard } from "../ui/TestimonialCard";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";

import { useTestimonials } from "../../hooks/useTestimonials";

export function Testimonials() {
    const { testimonials, loading } = useTestimonials();

    const activeTestimonials = testimonials.filter(
        (testimonial) => testimonial.active
    );

    if (loading) {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-black py-24">
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="O que nossos"
                        highlight="Clientes dizem"
                        subtitle="A satisfação dos nossos clientes é o reflexo da dedicação e qualidade que entregamos todos os dias."
                    />

                    <ResponsiveCarousel
                        desktopColumns={3}
                        mobileSlidesPerView={1}
                        tabletSlidesPerView={2}
                        autoplay
                        delay={5000}
                    >
                        {activeTestimonials.map((testimonial) => (
                            <TestimonialCard
                                key={testimonial.id}
                                name={testimonial.name}
                                role={testimonial.role}
                                image={testimonial.image}
                                content={testimonial.content}
                                rating={testimonial.rating}
                            />
                        ))}
                    </ResponsiveCarousel>
                </div>
            </Container>
        </section>
    );
}