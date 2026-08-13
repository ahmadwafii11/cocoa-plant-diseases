import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";

import Beranda from "../page/Beranda";
import DeteksiPenyakit from "../page/DeteksiPenyakit";
import TentangPenyakit from "../page/TentangPenyakit";
import Profil from "../page/Profil";

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
                path="/deteksi-penyakit"
                element={
                    <DeteksiPenyakit/>
                }/>
                <Route
                path="/tentang-penyakit"
                element={
                    <TentangPenyakit/>
                }/>
                <Route
                path="/profil"
                element={
                    <Profil/>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;