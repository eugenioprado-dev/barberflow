import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Admin } from "../pages/Admin";
import { Login } from "../admin/pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/admin/login" element={<Login />} />

            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}