import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* =========================
                    PUBLIC ROUTES
                ========================= */}

                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}