import { Container } from "../layout/container";
import { stats } from "../../constants/stats";

export function Stats() {
    return (
        <section className="bg-black py-16">
            <Container>
                <div className="grid grid-cols-2 gap-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.label} className="text-center">
                            <h3 className="text-4xl font-bold text-amber-500">
                                {item.value}
                            </h3>

                            <p className="mt-2 text-sm text-zinc-400">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}