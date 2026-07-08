import {
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
    FaPlus,
    FaArrowRight,
    FaTags,
    FaCamera,
    FaCheckCircle,
} from "react-icons/fa";

import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

import { StatCard } from "../components/StatCard";
import { AdminSection } from "../components/AdminSection";
import { AdminLoading } from "../components/AdminLoading";

import { useProfessionals } from "../../hooks/useProfessionals";
import { useServices } from "../../hooks/useServices";
import { useCategories } from "../../hooks/useCategories";
import { useGallery } from "../../hooks/useGallery";
import { useTestimonials } from "../../hooks/useTestimonials";
import { useSite } from "../../hooks/useSite";

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
    const { site } = useSite();

    const { professionals, loading: professionalsLoading } =
        useProfessionals();

    const { services, loading: servicesLoading } = useServices();
    const { categories, loading: categoriesLoading } = useCategories();
    const { gallery, loading: galleryLoading } = useGallery();
    const { testimonials, loading: testimonialsLoading } =
        useTestimonials();

    const loading =
        !site ||
        professionalsLoading ||
        servicesLoading ||
        categoriesLoading ||
        galleryLoading ||
        testimonialsLoading;

    const businessName = site?.business.name ?? "André Dias Studio";

    const activeProfessionals = professionals.filter(
        (item) => item.active
    ).length;

    const activeServices = services.filter((item) => item.active).length;

    const activeCategories = categories.filter(
        (item) => item.active
    ).length;

    const activeGallery = gallery.filter((item) => item.active).length;

    const activeTestimonials = testimonials.filter(
        (item) => item.active
    ).length;

    const totalGalleryImages = gallery
        .filter((item) => item.active)
        .reduce((total, item) => {
            const coverImage = item.image ? 1 : 0;
            const extraImages = item.images.length;

            return total + coverImage + extraImages;
        }, 0);

    const contentStatus = [
        `${activeProfessionals} profissionais ativos`,
        `${activeServices} serviços disponíveis`,
        `${activeCategories} categorias cadastradas`,
        `${activeGallery} trabalhos publicados`,
        `${totalGalleryImages} fotos publicadas`,
        `${activeTestimonials} depoimentos exibidos`,
    ];

    return (
        <div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
                    {businessName}
                </p>

                <h1 className="mt-4 text-4xl font-bold">
                    Painel Administrativo 👋
                </h1>

                <p className="mt-3 max-w-2xl text-zinc-400">
                    Acompanhe os principais dados do site e gerencie os
                    conteúdos exibidos para os clientes.
                </p>
            </div>

            {loading ? (
                <AdminLoading
                    title="Carregando dashboard..."
                    description="Aguarde enquanto buscamos os dados principais do painel."
                />
            ) : (
                <>
                    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-6">
                        <StatCard
                            icon={<FaUsers />}
                            title="Profissionais"
                            value={activeProfessionals}
                            description="Ativos no site."
                            badge="Equipe"
                        />

                        <StatCard
                            icon={<FaCut />}
                            title="Serviços"
                            value={activeServices}
                            description="Disponíveis para agendamento."
                            badge="Serviços"
                        />

                        <StatCard
                            icon={<FaTags />}
                            title="Categorias"
                            value={activeCategories}
                            description="Organizando os serviços."
                            badge="Menu"
                        />

                        <StatCard
                            icon={<FaImages />}
                            title="Trabalhos"
                            value={activeGallery}
                            description="Publicados no portfólio."
                            badge="Galeria"
                        />

                        <StatCard
                            icon={<FaCamera />}
                            title="Fotos"
                            value={totalGalleryImages}
                            description="Imagens publicadas."
                            badge="Mídia"
                        />

                        <StatCard
                            icon={<FaStar />}
                            title="Depoimentos"
                            value={activeTestimonials}
                            description="Exibidos na Home."
                            badge="Social"
                        />
                    </div>

                    <div className="mt-10 grid gap-8 lg:grid-cols-2">
                        <AdminSection
                            title="Ações rápidas"
                            description="Acesse rapidamente as principais áreas do painel."
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                {quickActions.map(
                                    ({ label, href, Icon }) => (
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
                                    )
                                )}
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
                                        <span className="flex items-center gap-3">
                                            <FaCheckCircle className="text-emerald-400" />
                                            {item}
                                        </span>

                                        <span className="text-amber-400">
                                            <FaArrowRight />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </AdminSection>
                    </div>
                </>
            )}
        </div>
    );
}