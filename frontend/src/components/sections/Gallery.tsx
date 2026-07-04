import { useState } from "react";

import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";

import { useGallery } from "../../hooks/useGallery";
import { useProfessionals } from "../../hooks/useProfessionals";

export function Gallery() {
    const { gallery, loading } = useGallery();
    const { professionals } = useProfessionals();

    const [visibleItems, setVisibleItems] = useState(6);

    const activeGallery = gallery
        .filter((item) => item.active)
        .sort((a, b) => b.id - a.id);

    const visibleGallery = activeGallery.slice(0, visibleItems);

    function getProfessionalName(id: number | null) {
        return (
            professionals.find((professional) => professional.id === id)
                ?.name ?? "André Dias Studio"
        );
    }

    if (loading) {
        return null;
    }

    return (
        <section
            id="gallery"
            className="relative overflow-hidden bg-zinc-950 py-24"
        >
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nosso"
                        highlight="Portfólio"
                        subtitle="Veja alguns trabalhos realizados pela nossa equipe e conheça de perto o cuidado em cada detalhe."
                    />

                    {activeGallery.length === 0 ? (
                        <div className="mt-16 rounded-3xl border border-white/10 bg-zinc-900/70 p-10 text-center text-zinc-400">
                            Nenhum trabalho cadastrado ainda.
                        </div>
                    ) : (
                        <>
                            <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {visibleGallery.map((item) => (
                                    <article
                                        key={item.id}
                                        className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 shadow-xl transition hover:border-amber-500/50"
                                    >
                                        <div className="relative h-72 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                            <div className="absolute bottom-5 left-5 right-5">
                                                <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
                                                    {getProfessionalName(
                                                        item.professionalId
                                                    )}
                                                </p>

                                                <h3 className="mt-2 text-2xl font-bold text-white">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <p className="line-clamp-3 leading-7 text-zinc-400">
                                                {item.description}
                                            </p>

                                            <button
                                                type="button"
                                                className="mt-6 rounded-xl border border-amber-500/40 px-5 py-3 font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-black"
                                            >
                                                Ver trabalho
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {visibleItems < activeGallery.length && (
                                <div className="mt-12 flex justify-center">
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            setVisibleItems(
                                                (current) => current + 6
                                            )
                                        }
                                    >
                                        Ver mais trabalhos
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}