import { ScanSearch } from "lucide-react";

import Badge from "../ui/Badge";

// Desainnya terdapat di src/styles/detection.css (bagian 1. HERO)
// Judul halaman Deteksi Penyakit
export default function DetectHero() {
    return (
        <section className="detect-hero">
            <div className="container-wide">
                <div className="detect-hero-inner">
                    <Badge
                        variant="dark"
                        icon={<ScanSearch className="icon-sm" aria-hidden="true" />}
                        className="detect-badge"
                    >
                        AI Disease Detection
                    </Badge>

                    <h1 className="detect-title">
                        Deteksi Penyakit
                        <span className="detect-title-accent">Buah Kakao</span>
                    </h1>

                    <p className="detect-desc">
                        Unggah gambar buah kakao dan biarkan CocoaScan membantu
                        mengidentifikasi kemungkinan gangguan berdasarkan citra
                        menggunakan model kecerdasan buatan.
                    </p>
                </div>
            </div>
        </section>
    );
}