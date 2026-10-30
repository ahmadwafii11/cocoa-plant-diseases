import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { APP_NAME } from "../../constants/site";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import HeroPreviewCard from "./HeroPreviewCard";

// Desainnya ada di: src/styles/landing.css (bagian 1. HERO)
const TRUST_ITEMS = ["Mudah digunakan", "Berbasis AI", "Hasil klasifikasi"];

export default function Hero() {
    return (
        <section className="hero">
            {/* Dua lingkaran cahaya sebagai hiasan latar */}
            <div className="hero-blob-left" aria-hidden="true" />
            <div className="hero-blob-right" aria-hidden="true" />

            <div className="container-wide hero-inner">
                <div className="hero-grid">
                    {/* KIRI: teks */}
                    <div className="hero-content">
                        <Badge
                            variant="dark"
                            icon={<Sparkles className="icon-sm" aria-hidden="true" />}
                            className="hero-badge"
                        >
                            Deteksi Penyakit Berbasis AI
                        </Badge>

                        <h1 className="hero-title">
                            Kenali Penyakit
                            <span className="hero-title-accent">
                                Buah Kakao
                            </span>
                            dengan Lebih Mudah
                        </h1>

                        <p className="hero-desc">
                            {APP_NAME} membantu mengidentifikasi penyakit pada
                            buah kakao menggunakan teknologi kecerdasan buatan
                            sehingga proses deteksi dapat dilakukan dengan
                            lebih cepat dan praktis.
                        </p>

                        <div className="hero-actions">
                            <Button
                                to="/login"
                                size="lg"
                                rightIcon={
                                    <ArrowRight className="icon-sm" aria-hidden="true" />
                                }
                            >
                                Mulai Deteksi
                            </Button>

                            <Button to="/register" variant="outline" size="lg">
                                Buat Akun
                            </Button>
                        </div>

                        <ul className="hero-trust">
                            {TRUST_ITEMS.map((item) => (
                                <li key={item} className="hero-trust-item">
                                    <CheckCircle2
                                        className="icon-sm icon-accent"
                                        aria-hidden="true"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KANAN: kartu preview */}
                    <div className="hero-visual">
                        <HeroPreviewCard />
                    </div>
                </div>
            </div>
        </section>
    );
};
