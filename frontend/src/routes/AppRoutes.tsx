import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "../constants/site";

import ProtectedRoute from "../components/routes/ProtectedRoute";
import ScrollToTop from "../components/layout/ScrollToTop";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TermsConditions from "../pages/TermsConditions";

import Beranda from "../pages/Beranda";
import Profil from "../pages/Profil";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* =========================
                    PUBLIC ROUTES
                ========================= */}
                <Route path={ROUTES.landing} element={<Landing />} />
                <Route path={ROUTES.login} element={<Login />} />
                <Route path={ROUTES.register} element={<Register />} />
                <Route path={ROUTES.terms} element={<TermsConditions />} />

                {/* =========================
                    PROTECTED ROUTES
                ========================= */}
                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.home} element={<Beranda />} />
                    <Route path={ROUTES.profile} element={<Profil />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};