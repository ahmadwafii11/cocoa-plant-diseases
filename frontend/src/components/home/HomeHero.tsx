import { ArrowRight, Sparkles } from "lucide-react";

import { ROUTES } from "../../constants/site";

import backgroundImage from "../../assets/background-beranda.jpg";

import Badge from "../ui/Badge";
import Button from "../ui/Button";

// Desainnya ada di: src/styles/home.css (bagian 1. HERO)
interface HomeHeroProps {
    /** Nama panggilan pengguna untuk sapaan. Kosong = sapaan umum. */
    name?: string;
}

export default function HomeHero({ name }: HomeHeroProps) {
    return (
        <section className="home-hero">
            {/* Foto latar + lapisan hijau gelap agar teks terbaca */}
            <img
                src={backgroundImage}
                alt=""
                aria-hidden="true"
                className="home-hero-img"
            />
            <div className="home-hero-overlay" aria-hidden="true" />

            <div className="container-narrow home-hero-inner">
                <Badge
                    variant="dark"
                    icon={<Sparkles className="icon-sm" aria-hidden="true" />}
                    className="home-badge"
                >
                    {name ? `Selamat datang, ${name}` : "Selamat datang"}
                </Badge>

                <h1 className="home-title">
                    Periksa Kondisi
                    <span className="home-title-accent">Buah Kakao Anda</span>
                </h1>

                <p className="home-desc">
                    Unggah foto buah kakao untuk mendapatkan hasil klasifikasi
                    penyakit beserta informasi penanganannya.
                </p>

                <div className="home-actions">
                    <Button
                        to={ROUTES.detect}
                        size="lg"
                        rightIcon={
                            <ArrowRight className="icon-sm" aria-hidden="true" />
                        }
                    >
                        Mulai Deteksi
                    </Button>

                    <Button to={ROUTES.history} variant="outline" size="lg">
                        Lihat Riwayat
                    </Button>
                </div>
            </div>
        </section>
    );
}