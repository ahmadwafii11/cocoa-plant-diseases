import { APP_NAV_LINKS, ROUTES } from "../constants/site";

import { useAuth } from "../hooks/useAuth";

import HomeHero from "../components/home/HomeHero";
import PhotoTips from "../components/home/PhotoTips";
import QuickActions from "../components/home/QuickActions";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import UserActions from "../components/layout/UserActions";

// Desainnya ada di: src/styles/home.css
export default function Beranda() {
    const { user } = useAuth();

    // Ambil nama depan untuk sapaan, mis. "Wafi Ahmad" -> "Wafi"
    const firstName = user?.full_name.split(" ")[0] ?? user?.username ?? "";

    return (
        <div className="page">
            <Navbar
                links={APP_NAV_LINKS}
                homeTo={ROUTES.home}
                actions={<UserActions />}
            />

            <main className="page-main">
                <HomeHero name={firstName} />
                <QuickActions />
                <PhotoTips />
            </main>

            <Footer />
        </div>
    );
}