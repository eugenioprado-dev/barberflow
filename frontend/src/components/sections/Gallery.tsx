import { useState } from "react";

import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { GalleryCard } from "../ui/GalleryCard";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";

import { useGallery } from "../../hooks/useGallery";
import { useProfessionals } from "../../hooks/useProfessionals";
import { GalleryModal } from "../modals/GalleryModal";
import { PortfolioModal } from "../modals/PortfolioModal";
import { FadeIn } from "../../animations/FadeIn";
import type { Gallery as GalleryModel } from "../../models/Gallery";

export function Gallery() {
    const { gallery, loading } = useGallery();
    const { professionals } = useProfessionals();

    const [portfolioOpen, setPortfolioOpen] = useState(false);
    const [selectedItem, setSelectedItem] =
        useState<GalleryModel | null>(null);

    const activeGallery = gallery
        .filter((item) => item.active)
        .sort((a, b) => b.id - a.id);

    const featuredGallery = activeGallery.slice(0, 3);

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
        <>
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
                                <div className="mt-16 block md:hidden">
                                    <ResponsiveCarousel
                                        desktopColumns={2}
                                        mobileSlidesPerView={1}
                                        tabletSlidesPerView={1}
                                        autoplay
                                        delay={3000}
                                    >
                                        {featuredGallery.map((item, index) => (
                                            <FadeIn
                                                key={item.id}
                                                delay={index * 0.08}
                                            >
                                                <GalleryCard
                                                    title={item.title}
                                                    image={item.image}
                                                    imagesCount={item.images.length}
                                                    professionalName={getProfessionalName(
                                                        item.professionalId
                                                    )}
                                                    description={item.description}
                                                    onClick={() =>
                                                        setSelectedItem(item)
                                                    }
                                                />
                                            </FadeIn>
                                        ))}
                                    </ResponsiveCarousel>
                                </div>

                                <div className="mt-16 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
                                    {featuredGallery.map((item) => (
                                        <GalleryCard
                                            key={item.id}
                                            title={item.title}
                                            image={item.image}
                                            imagesCount={item.images.length}
                                            professionalName={getProfessionalName(
                                                item.professionalId
                                            )}
                                            description={item.description}
                                            onClick={() =>
                                                setSelectedItem(item)
                                            }
                                        />
                                    ))}
                                </div>

                                {activeGallery.length > 3 && (
                                    <div className="mt-12 flex justify-center">
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                setPortfolioOpen(true)
                                            }
                                        >
                                            Ver portfólio completo
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Container>
            </section>

            <PortfolioModal
                open={portfolioOpen}
                gallery={activeGallery}
                professionals={professionals}
                onClose={() => setPortfolioOpen(false)}
                onSelect={(item) => {
                    setPortfolioOpen(false);
                    setSelectedItem(item);
                }}
            />

            <GalleryModal
                key={selectedItem?.id ?? "closed"}
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </>
    );
}