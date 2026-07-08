import { motion } from "framer-motion";

import andreImage from "../../assets/images/hero/andre-dias.webp";

import { fadeUp, staggerContainer } from "../../animations/fade";
import { floating } from "../../animations/float";

import { Button } from "../ui/Button";
import { Container } from "../layout/container";

import { useProfessionals } from "../../hooks/useProfessionals";

export function Hero() {
    const { professionals, loading } = useProfessionals();

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    ).length;

    const professionalsLabel =
        activeProfessionals === 1 ? "Profissional" : "Profissionais";

    function scrollToSection(id: string) {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    }

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-zinc-950 pt-44 pb-24"
        >
            <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px] lg:h-[700px] lg:w-[700px] lg:blur-[180px]" />
            <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-amber-500/10 blur-[90px] lg:-left-32 lg:h-96 lg:w-96 lg:blur-[140px]" />
            <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-[90px] lg:-right-32 lg:h-96 lg:w-96 lg:blur-[140px]" />

            <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.span
                        variants={fadeUp}
                        className="inline-block rounded-full border border-amber-500 px-5 py-2 text-sm text-amber-400"
                    >
                        Agendamento Online
                    </motion.span>

                    <motion.h1
                        variants={fadeUp}
                        className="mt-8 text-5xl font-bold leading-tight lg:text-7xl"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Muito mais que
                        <br />

                        <span className="text-amber-500">
                            um corte.
                        </span>

                        <br />

                        Uma experiência.
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-8 max-w-xl text-lg leading-8 text-zinc-400"
                    >
                        Cuidamos da sua imagem com serviços de barbearia,
                        manicure, pedicure e depilação, oferecendo atendimento
                        de qualidade, conforto e praticidade através do
                        agendamento online.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <Button
                            type="button"
                            onClick={() => scrollToSection("team")}
                        >
                            Agendar Horário
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => scrollToSection("services")}
                        >
                            Conhecer Serviços
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        className="mt-10 flex flex-wrap gap-3"
                    >
                        <button
                            type="button"
                            onClick={() => scrollToSection("services")}
                            className="rounded-full border border-zinc-700 px-5 py-2 transition hover:border-amber-500"
                        >
                            💈 Barbearia
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("services")}
                            className="rounded-full border border-zinc-700 px-5 py-2 transition hover:border-amber-500"
                        >
                            💅 Manicure
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("services")}
                            className="rounded-full border border-zinc-700 px-5 py-2 transition hover:border-amber-500"
                        >
                            ✨ Depilação & Massagem
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="relative flex justify-center"
                >
                    <div className="absolute h-[320px] w-[320px] rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-500/30 blur-[100px] lg:h-[450px] lg:w-[450px] lg:blur-[140px]" />

                    <motion.div
                        variants={floating}
                        animate="animate"
                        className="relative h-[560px] w-full max-w-md overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-[0_25px_90px_rgba(245,158,11,0.22)] backdrop-blur-xl"
                    >
                        <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                        <img
                            src={andreImage}
                            alt="André Dias Studio"
                            className="relative h-full w-full object-cover transition duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute bottom-6 left-6 z-20 rounded-full border border-white/10 bg-black/60 px-5 py-2 backdrop-blur-md">
                            <p className="text-sm font-medium text-white">
                                ✂️ Especialista em Cortes Unissex
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto mt-24 grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4"
            >
                <motion.div variants={fadeUp} className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">
                        +500
                    </h3>

                    <p className="mt-2 text-zinc-400">
                        Clientes atendidos
                    </p>
                </motion.div>

                <motion.div variants={fadeUp} className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">
                        {loading ? "..." : activeProfessionals}
                    </h3>

                    <p className="mt-2 text-zinc-400">
                        {professionalsLabel}
                    </p>
                </motion.div>

                <motion.div variants={fadeUp} className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">
                        100%
                    </h3>

                    <p className="mt-2 text-zinc-400">
                        Atendimento personalizado
                    </p>
                </motion.div>

                <motion.div variants={fadeUp} className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">
                        ⭐ 5.0
                    </h3>

                    <p className="mt-2 text-zinc-400">
                        Avaliação dos clientes
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}