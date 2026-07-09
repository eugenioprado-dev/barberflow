import { motion } from "framer-motion";

import andreImage from "../../assets/images/hero/andre-dias.webp";

import { fadeUp, staggerContainer } from "../../animations/fade";
import { floating } from "../../animations/float";

import { Button } from "../ui/Button";
import { Container } from "../layout/container";

export function Hero() {
    function scrollToSection(id: string) {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
        });
    }

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-zinc-950 pb-16 pt-36 sm:pb-20 sm:pt-44"
        >
            <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px] lg:h-[700px] lg:w-[700px] lg:blur-[180px]" />
            <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-amber-500/10 blur-[90px] lg:-left-32 lg:h-96 lg:w-96 lg:blur-[140px]" />
            <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-[90px] lg:-right-32 lg:h-96 lg:w-96 lg:blur-[140px]" />

            <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center lg:text-left"
                >
                    <motion.span
                        variants={fadeUp}
                        className="inline-block rounded-full border border-amber-500 px-5 py-2 text-sm text-amber-400"
                    >
                        Agendamento Online
                    </motion.span>

                    <motion.h1
                        variants={fadeUp}
                        className="mt-7 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl"
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
                        className="mx-auto mt-6 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg lg:mx-0 lg:mt-8"
                    >
                        Cuidamos da sua imagem com serviços de barbearia,
                        manicure, pedicure e depilação, oferecendo atendimento
                        de qualidade, conforto e praticidade através do
                        agendamento online.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
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
                        className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
                    >
                        <button
                            type="button"
                            onClick={() => scrollToSection("services")}
                            className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-amber-500 sm:px-5 sm:text-base"
                        >
                            💈 Barbearia
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("services")}
                            className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-amber-500 sm:px-5 sm:text-base"
                        >
                            💅 Manicure
                        </button>

                        <button
                            type="button"
                            onClick={() => scrollToSection("services")}
                            className="rounded-full border border-zinc-700 px-4 py-2 text-sm transition hover:border-amber-500 sm:px-5 sm:text-base"
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
                    <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-400/20 to-amber-500/30 blur-[90px] sm:h-[360px] sm:w-[360px] lg:h-[450px] lg:w-[450px] lg:blur-[140px]" />

                    <motion.div
                        variants={floating}
                        animate="animate"
                        className="relative h-[420px] w-full max-w-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-[0_25px_90px_rgba(245,158,11,0.18)] backdrop-blur-xl sm:h-[520px] sm:max-w-md lg:h-[560px]"
                    >
                        <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

                        <img
                            src={andreImage}
                            alt="André Dias Studio"
                            className="relative h-full w-full object-cover transition duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute bottom-5 left-1/2 z-20 w-[calc(100%-2rem)] -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-center backdrop-blur-md sm:left-6 sm:w-auto sm:translate-x-0 sm:px-5">
                            <p className="text-xs font-medium text-white sm:text-sm">
                                ✂️ Especialista em Cortes Unissex
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}