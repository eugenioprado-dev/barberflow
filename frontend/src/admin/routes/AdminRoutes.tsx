import { Routes, Route, Navigate } from "react-router-dom";

import { AdminLayout } from "../layouts/AdminLayout";

import { Dashboard } from "../pages/Dashboard";
import { Professionals } from "../pages/Professionals";
import { Services } from "../pages/Services";
import { Gallery } from "../pages/Gallery";
import { Testimonials } from "../pages/Testimonials";
import { Settings } from "../pages/Settings";

export function AdminRoutes() {
    return (
        <AdminLayout>
            <Routes>
                <Route
                    index
                    element={<Navigate to="dashboard" replace />}
                />

                <Route
                    path="dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="profissionais"
                    element={<Professionals />}
                />

                <Route
                    path="servicos"
                    element={<Services />}
                />

                <Route
                    path="galeria"
                    element={<Gallery />}
                />

                <Route
                    path="depoimentos"
                    element={<Testimonials />}
                />

                <Route
                    path="configuracoes"
                    element={<Settings />}
                />
            </Routes>
        </AdminLayout>
    );
}