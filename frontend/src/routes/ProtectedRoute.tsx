import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
                        Verificando acesso
                    </p>

                    <h1 className="mt-3 text-2xl font-bold">
                        Aguarde...
                    </h1>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <>{children}</>;
}