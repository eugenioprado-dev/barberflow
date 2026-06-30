import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { GalleryCard } from "../ui/GalleryCard";
import { ResponsiveCarousel } from "../ui/ResponsiveCarousel";
import { Button } from "../ui/Button";

import { galleryStore } from "../../store/galleryStore";

export function Gallery() {
    const gallery = galleryStore.getActive();

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
                        title="Nossa"
                        highlight="Galeria"
                        subtitle="Conheça um pouco do nosso ambiente, dos nossos serviços e da experiência que oferecemos aos nossos clientes."
                    />

                    <ResponsiveCarousel
                        desktopColumns={4}
                        mobileSlidesPerView={1}
                        tabletSlidesPerView={2}
                    >
                        {gallery.map((item) => (
                            <GalleryCard
                                key={item.id}
                                title={item.title}
                                image={item.image}
                            />
                        ))}
                    </ResponsiveCarousel>

                    <div className="mt-16 flex justify-center">
                        <Button variant="secondary">
                            Ver todos os trabalhos
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}