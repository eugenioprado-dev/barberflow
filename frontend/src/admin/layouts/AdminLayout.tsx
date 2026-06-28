import type { ReactNode } from "react";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <AdminSidebar />

            <div className="lg:pl-72">
                <AdminHeader />

                <main className="px-6 py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}