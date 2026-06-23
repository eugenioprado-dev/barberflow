import { Button } from "../ui/Button";
import { Container } from "../layout/container";

export function Hero() {
    return (
        <section className="bg-zinc-950 pt-44 pb-24">
            <Container className="grid items-center gap-12 lg:grid-cols-2">
                {/* Texto */}
                <div>
                    <span className="rounded-full border border-amber-500 px-5 py-2 text-sm text-amber-400">
                        Agendamento Online
                    </span>

                    <h1
                        className="mt-8 text-6xl font-bold leading-tight lg:text-7xl"
                        style={{ fontFamily: "Playfair Display" }}
                    >
                        Muito mais que
                        <br />

                        <span className="text-amber-500">
                            um corte.
                        </span>

                        <br />

                        Uma experiência.
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">

                        Cuidamos da sua imagem com serviços de barbearia, manicure,
                        pedicure e depilação, oferecendo um atendimento de qualidade,
                        conforto e praticidade através do agendamento online.

                    </p>

                    <div className="mt-10 flex gap-4">

                        <Button>
                            Agendar Horário
                        </Button>

                        <Button variant="secondary">
                            Conhecer Serviços
                        </Button>

                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">

                        <div className="rounded-full border border-zinc-700 px-5 py-2">
                            💈 Barbearia
                        </div>

                        <div className="rounded-full border border-zinc-700 px-5 py-2">
                            💅 Manicure
                        </div>

                        <div className="rounded-full border border-zinc-700 px-5 py-2">
                            ✨ Depilação
                        </div>

                    </div>
                </div>

                {/* Imagem */}
                <div className="flex justify-center">
                    <div className="flex h-[550px] w-full max-w-md items-center justify-center rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 text-center text-zinc-500 shadow-2xl">
                        <div>
                            <p className="text-lg font-semibold">
                                Em breve
                            </p>

                            <p className="mt-2 text-sm">
                                Foto da equipe
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="mt-24 grid grid-cols-2 gap-6 lg:grid-cols-4">

                <div className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">+500</h3>
                    <p className="mt-2 text-zinc-400">Clientes atendidos</p>
                </div>

                <div className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">3</h3>
                    <p className="mt-2 text-zinc-400">Profissionais</p>
                </div>

                <div className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">100%</h3>
                    <p className="mt-2 text-zinc-400">Atendimento personalizado</p>
                </div>

                <div className="text-center">
                    <h3 className="text-4xl font-bold text-amber-500">⭐ 5.0</h3>
                    <p className="mt-2 text-zinc-400">Avaliação dos clientes</p>
                </div>

            </div>
        </section>
    );
}