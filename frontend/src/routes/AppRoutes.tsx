import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "../components/layout/ScrollToTop";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TermsConditions from "../pages/TermsConditions";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* =========================
                    PUBLIC ROUTES
                ========================= */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/syarat-ketentuan" element={<TermsConditions />} />
            </Routes>
        </BrowserRouter>
    );
};