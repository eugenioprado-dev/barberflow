import { Container } from "../layout/container";
import { stats } from "../../data";

import { useProfessionals } from "../../hooks/useProfessionals";

export function Stats() {
    const { professionals, loading } = useProfessionals();

    const activeProfessionals = professionals.filter(
        (professional) => professional.active
    ).length;

    return (
        <section className="bg-black py-16">
            <Container>
                <div className="grid grid-cols-2 gap-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 lg:grid-cols-4">
                    {stats.map((item) => {
                        const isProfessionals =
                            item.key === "professionals";

                        const value = isProfessionals
                            ? loading
                                ? "..."
                                : activeProfessionals
                            : item.value;

                        const label = isProfessionals
                            ? activeProfessionals === 1
                                ? "Profissional"
                                : "Profissionais"
                            : item.label;

                        return (
                            <div key={item.key} className="text-center">
                                <h3 className="text-4xl font-bold text-amber-500">
                                    {value}
                                </h3>

                                <p className="mt-2 text-sm text-zinc-400">
                                    {label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}