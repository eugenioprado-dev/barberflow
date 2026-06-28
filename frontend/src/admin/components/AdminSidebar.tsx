import {
    FaChartLine,
    FaUsers,
    FaCut,
    FaImages,
    FaStar,
    FaCog,
} from "react-icons/fa";

const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <FaChartLine /> },
    { label: "Profissionais", href: "/admin/profissionais", icon: <FaUsers /> },
    { label: "Serviços", href: "/admin/servicos", icon: <FaCut /> },
    { label: "Galeria", href: "/admin/galeria", icon: <FaImages /> },
    { label: "Depoimentos", href: "/admin/depoimentos", icon: <FaStar /> },
    { label: "Configurações", href: "/admin/configuracoes", icon: <FaCog /> },
];

export function AdminSidebar() {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-black/60 p-6 backdrop-blur-xl lg:block">
            <h1 className="text-2xl font-bold">
                André Dias <span className="text-amber-500">Studio</span>
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
                Painel Administrativo
            </p>

            <nav className="mt-10 space-y-2">
                {menuItems.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-amber-500/10 hover:text-amber-400"
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
}