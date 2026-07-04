import {
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
    FaPlus,
    FaArrowRight,
    FaTags,
    FaCamera,
} from "react-icons/fa";

import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

import { StatCard } from "../components/StatCard";
import { AdminSection } from "../components/AdminSection";

import { useProfessionals } from "../../hooks/useProfessionals";
import { useServices } from "../../hooks/useServices";
import { useCategories } from "../../hooks/useCategories";
import { useGallery } from "../../hooks/useGallery";

const quickActions = [
    { label: "Novo Profissional", href: "/admin/profissionais", Icon: FaUsers },
    { label: "Novo Serviço", href: "/admin/servicos", Icon: FaCut },
    { label: "Nova Categoria", href: "/admin/categorias", Icon: FaTags },
    { label: "Novo Trabalho", href: "/admin/galeria", Icon: FaImages },
    { label: "Novo Depoimento", href: "/admin/depoimentos", Icon: FaStar },
] satisfies {
    label: string;
    href: string;
    Icon: IconType;
}[];

export function Dashboard() {
    const { professionals } = useProfessionals();
    const { services } = useServices();
    const { categories } = useCategories();
    const { gallery } = useGallery();

    const activeProfessionals = professionals.filter((item) => item.active).length;
    const activeServices = services.filter((item) => item.active).length;
    const activeCategories = categories.filter((item) => item.active).length;
    const activeGallery = gallery.filter((item) => item.active).length;

    const totalGalleryImages = gallery.reduce(
        (total, item) => total + item.images.length,
        0
    );

    const activeTestimonials = 0;

    const contentStatus = [
        `${activeProfessionals} profissionais ativos`,
        `${activeServices} serviços disponíveis`,
        `${activeCategories} categorias cadastradas`,
        `${activeGallery} trabalhos publicados`,
        `${totalGalleryImages} fotos adicionadas`,
        `${activeTestimonials} depoimentos exibidos`,
    ];

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
                    Bem-vindo ao painel administrativo. Aqui você acompanha os
                    principais dados do site e gerencia conteúdos exibidos para
                    os clientes.
                </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
                <StatCard icon={<FaUsers />} title="Profissionais" value={activeProfessionals} description="Ativos no site." />
                <StatCard icon={<FaCut />} title="Serviços" value={activeServices} description="Disponíveis." />
                <StatCard icon={<FaTags />} title="Categorias" value={activeCategories} description="Ativas." />
                <StatCard icon={<FaImages />} title="Trabalhos" value={activeGallery} description="Publicados." />
                <StatCard icon={<FaCamera />} title="Fotos" value={totalGalleryImages} description="Na galeria." />
                <StatCard icon={<FaStar />} title="Depoimentos" value={activeTestimonials} description="Exibidos." />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <AdminSection
                    title="Ações rápidas"
                    description="Acesse rapidamente as principais áreas do painel."
                >
                    <div className="grid gap-4 sm:grid-cols-2">
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
                </AdminSection>

                <AdminSection
                    title="Status do conteúdo"
                    description="Visão geral dos conteúdos publicados no site."
                >
                    <div className="space-y-4">
                        {contentStatus.map((item) => (
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
                </AdminSection>
            </div>
        </div>
    );
}