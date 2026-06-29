import type { ReactNode } from "react";
import { useState } from "react";

import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <AdminSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="lg:pl-72">
                <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="px-6 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}