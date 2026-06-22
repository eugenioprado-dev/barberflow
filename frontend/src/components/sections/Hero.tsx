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
                        um corte.
                        <br />
                        Uma experiência.
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">

                        Barbearia, manicure, pedicure e depilação
                        com atendimento profissional e
                        agendamento online.

                    </p>

                    <div className="mt-10 flex gap-4">

                        <Button>
                            Agendar Horário
                        </Button>

                        <Button variant="secondary">
                            Conhecer Serviços
                        </Button>

                    </div>
                </div>

                {/* Imagem */}
                <div className="flex justify-center">
                    <div className="flex h-[500px] w-full max-w-md items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 text-zinc-500">
                        FOTO DO BARBEIRO
                    </div>
                </div>
            </Container>
        </section>
    );
}