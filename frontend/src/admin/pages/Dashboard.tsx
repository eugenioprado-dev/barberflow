import {
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";

import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

import { StatCard } from "../components/StatCard";

import {
    professionals,
    services,
    gallery,
    testimonials,
} from "../../data";

const quickActions = [
    {
        label: "Novo Profissional",
        href: "/admin/profissionais",
        Icon: FaUsers,
    },
    {
        label: "Novo Serviço",
        href: "/admin/servicos",
        Icon: FaCut,
    },
    {
        label: "Nova Foto",
        href: "/admin/galeria",
        Icon: FaImages,
    },
    {
        label: "Novo Depoimento",
        href: "/admin/depoimentos",
        Icon: FaStar,
    },
] satisfies {
    label: string;
    href: string;
    Icon: IconType;
}[];

export function Dashboard() {
    const activeProfessionals = professionals.filter((item) => item.active).length;
    const activeServices = services.filter((item) => item.active).length;
    const activeGallery = gallery.filter((item) => item.active).length;
    const activeTestimonials = testimonials.filter((item) => item.active).length;

    return (
        <div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                    André Dias Studio
                </p>

                <h1 className="mt-4 text-4xl font-bold">
                    Olá, André 👋
                </h1>

                <p className="mt-3 max-w-2xl text-zinc-400">
                    Bem-vindo ao painel administrativo. Aqui você poderá gerenciar
                    profissionais, serviços, galeria, depoimentos e configurações
                    do site.
                </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    icon={<FaUsers />}
                    title="Profissionais"
                    value={activeProfessionals}
                    description="Profissionais ativos no site."
                />

                <StatCard
                    icon={<FaCut />}
                    title="Serviços"
                    value={activeServices}
                    description="Serviços disponíveis."
                />

                <StatCard
                    icon={<FaImages />}
                    title="Galeria"
                    value={activeGallery}
                    description="Imagens publicadas."
                />

                <StatCard
                    icon={<FaStar />}
                    title="Depoimentos"
                    value={activeTestimonials}
                    description="Avaliações exibidas."
                />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
                    <h2 className="text-xl font-semibold">
                        Ações rápidas
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Acesse rapidamente as principais áreas do painel.
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {quickActions.map(({ label, href, Icon }) => (
                            <Link
                                key={label}
                                to={href}
                                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300 transition hover:border-amber-500/40 hover:text-amber-400"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-amber-400">
                                        <Icon />
                                    </span>

                                    {label}
                                </span>

                                <FaPlus />
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="rounded-3xl border border-white/10 bg-zinc-900/70 p-6">
                    <h2 className="text-xl font-semibold">
                        Próximos módulos
                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        Funcionalidades que serão ativadas nas próximas etapas.
                    </p>

                    <div className="mt-6 space-y-4">
                        {[
                            "Cadastro e edição de profissionais",
                            "Gerenciamento de serviços e valores",
                            "Upload e organização da galeria",
                            "Configurações de WhatsApp e horários",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 text-zinc-300"
                            >
                                <span>{item}</span>
                                <span className="text-amber-400">
                                    <FaArrowRight />
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}