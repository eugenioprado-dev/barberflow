import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { TestimonialCard } from "../ui/TestimonialCard";

import { useTestimonials } from "../../hooks/useTestimonials";

export function Testimonials() {
    const { testimonials, loading } = useTestimonials();

    const activeTestimonials = testimonials.filter(
        (testimonial) => testimonial.active
    );

    const shouldLoop = activeTestimonials.length > 3;

    const loopTestimonials = shouldLoop
        ? [...activeTestimonials, ...activeTestimonials]
        : activeTestimonials;

    if (loading || activeTestimonials.length === 0) {
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

                    {shouldLoop ? (
                        <div className="mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                            <div className="testimonial-marquee-track flex w-max gap-8">
                                {loopTestimonials.map(
                                    (testimonial, index) => (
                                        <div
                                            key={`${testimonial.id}-${index}`}
                                            className="w-[85vw] shrink-0 sm:w-[26rem] lg:w-[24rem] xl:w-[25rem]"
                                        >
                                            <TestimonialCard
                                                name={testimonial.name}
                                                role={testimonial.role}
                                                image={testimonial.image}
                                                content={testimonial.content}
                                                rating={testimonial.rating}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                        </div>
                    )}
                </div>
            </Container>

            <style>
                {`
                    .testimonial-marquee-track {
                        animation: testimonial-marquee 45s linear infinite;
                    }

                    .testimonial-marquee-track:hover {
                        animation-play-state: paused;
                    }

                    @keyframes testimonial-marquee {
                        from {
                            transform: translateX(0);
                        }

                        to {
                            transform: translateX(-50%);
                        }
                    }

                    @media (max-width: 640px) {
                        .testimonial-marquee-track {
                            animation-duration: 28s;
                        }
                    }
                `}
            </style>
        </section>
    );
}