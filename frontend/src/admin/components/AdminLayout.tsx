import {
    FaChartLine,
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
    FaCog,
    FaTimes,
    FaTags,
    FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";

const menuItems = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <FaChartLine />,
    },
    {
        label: "Profissionais",
        href: "/admin/profissionais",
        icon: <FaUsers />,
    },
    {
        label: "Serviços",
        href: "/admin/servicos",
        icon: <FaCut />,
    },
    {
        label: "Categorias",
        href: "/admin/categorias",
        icon: <FaTags />,
    },
    {
        label: "Galeria",
        href: "/admin/galeria",
        icon: <FaImages />,
    },
    {
        label: "Depoimentos",
        href: "/admin/depoimentos",
        icon: <FaStar />,
    },
    {
        label: "Configurações",
        href: "/admin/configuracoes",
        icon: <FaCog />,
    },
];

interface AdminSidebarProps {
    open: boolean;
    onClose: () => void;
}

export function AdminSidebar({
    open,
    onClose,
}: AdminSidebarProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();

            toast.success("Sessão encerrada.");
            navigate("/admin/login", { replace: true });
        } catch (error) {
            console.error("Erro ao sair:", error);
            toast.error("Erro ao sair do painel.");
        }
    }

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Fechar menu administrativo"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-72
                    flex-col
                    border-r
                    border-white/10
                    bg-black/90
                    p-6
                    backdrop-blur-xl
                    transition-transform
                    duration-300
                    lg:translate-x-0
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">
                            André Dias{" "}
                            <span className="text-amber-500">
                                Studio
                            </span>
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Painel Administrativo
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Fechar menu"
                        onClick={onClose}
                        className="rounded-xl border border-white/10 p-3 text-zinc-400 transition hover:border-amber-500/40 hover:text-amber-400 lg:hidden"
                    >
                        <FaTimes />
                    </button>
                </div>

                <nav className="mt-10 flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.href}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-4
                                    py-3
                                    transition
                                    ${
                                        isActive
                                            ? "bg-amber-500/10 text-amber-400"
                                            : "text-zinc-400 hover:bg-amber-500/10 hover:text-amber-400"
                                    }
                                `
                            }
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-zinc-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                >
                    <FaSignOutAlt />
                    Sair
                </button>
            </aside>
        </>
    );
}