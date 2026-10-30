import FeatureSection from "../components/landing/FeatureSection";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import type { NavItem } from "../constants/site";

const NAV_LINKS: NavItem[] = [
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
];

function Landing() {
    return (
        <div className="page">
            <Navbar links={NAV_LINKS} />

            <main className="page-main">
                <Hero />
                <FeatureSection />
                <HowItWorks />
            </main>

            <Footer />
        </div>
    );
}

export default Landing;
