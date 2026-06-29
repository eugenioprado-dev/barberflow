import {
    FaChartLine,
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
    FaCog,
    FaTimes,
} from "react-icons/fa";

const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <FaChartLine /> },
    { label: "Profissionais", href: "/admin/profissionais", icon: <FaUsers /> },
    { label: "Serviços", href: "/admin/servicos", icon: <FaCut /> },
    { label: "Galeria", href: "/admin/galeria", icon: <FaImages /> },
    { label: "Depoimentos", href: "/admin/depoimentos", icon: <FaStar /> },
    { label: "Configurações", href: "/admin/configuracoes", icon: <FaCog /> },
];

interface AdminSidebarProps {
    open: boolean;
    onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
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
                    h-screen
                    w-72
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

                <nav className="mt-10 space-y-2">
                    {menuItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-amber-500/10 hover:text-amber-400"
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </a>
                    ))}
                </nav>
            </aside>
        </>
    );
}