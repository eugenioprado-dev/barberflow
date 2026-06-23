import { Container } from "../layout/container";
import { SectionTitle } from "../ui/SectionTitle";
import { GalleryCard } from "../ui/GalleryCard";
import { gallery } from "../../constants/gallery";

export function Gallery() {
    return (
        <section className="relative overflow-hidden bg-zinc-950 py-24">
            {/* Efeitos de fundo */}
            <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

            <Container>
                <div className="relative z-10">
                    <SectionTitle
                        title="Nossa"
                        highlight="Galeria"
                        subtitle="Conheça um pouco do nosso ambiente, dos nossos serviços e da experiência que oferecemos aos nossos clientes."
                    />

                    <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                        {gallery.map((item) => (
                            <GalleryCard
                                key={item.id}
                                title={item.title}
                                image={item.image}
                            />
                        ))}
                    </div>

                    {/* Botão */}
                    <div className="mt-16 flex justify-center">
                        <button
                            className="
                                rounded-full
                                border
                                border-amber-500
                                px-8
                                py-4
                                font-semibold
                                text-amber-500
                                transition-all
                                duration-300
                                hover:bg-amber-500
                                hover:text-black
                                hover:shadow-lg
                                hover:shadow-amber-500/30
                            "
                        >
                            Ver todos os trabalhos
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
}