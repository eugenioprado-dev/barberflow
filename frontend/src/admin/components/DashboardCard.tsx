import {
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
} from "react-icons/fa";

import { StatCard } from "../components/StatCard";

import { professionals } from "../../data";
import { services } from "../../data";
import { gallery } from "../../data";
import { testimonials } from "../../data";

export function Dashboard() {
    const activeProfessionals = professionals.filter(
        (item) => item.active
    ).length;

    const activeServices = services.filter(
        (item) => item.active
    ).length;

    const activeGallery = gallery.filter(
        (item) => item.active
    ).length;

    const activeTestimonials = testimonials.filter(
        (item) => item.active
    ).length;

    return (
        <div>
            <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                    André Dias Studio
                </p>

                <h1 className="mt-4 text-4xl font-bold">
                    Dashboard
                </h1>

                <p className="mt-3 max-w-2xl text-zinc-400">
                    Visão geral dos dados cadastrados no painel administrativo.
                </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    icon={<FaUsers />}
                    title="Profissionais"
                    value={activeProfessionals}
                    description="Profissionais ativos exibidos no site."
                />

                <StatCard
                    icon={<FaCut />}
                    title="Serviços"
                    value={activeServices}
                    description="Serviços ativos disponíveis para agendamento."
                />

                <StatCard
                    icon={<FaImages />}
                    title="Galeria"
                    value={activeGallery}
                    description="Imagens ativas exibidas na galeria."
                />

                <StatCard
                    icon={<FaStar />}
                    title="Depoimentos"
                    value={activeTestimonials}
                    description="Avaliações e comentários ativos no site."
                />
            </div>
        </div>
    );
}