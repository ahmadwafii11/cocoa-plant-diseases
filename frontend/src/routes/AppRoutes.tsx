import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Beranda from "../page/Beranda";
import TentangPenyakit from "../page/TentangPenyakit";

function AppRoutes(){
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route
                path="/"
                element={
                    <Beranda/>
                }/>
                <Route
                path="/tentang-penyakit"
                element={
                    <TentangPenyakit/>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;